const pool = require('../config/db');

class Event {
    static async create({ name, description, start_date_time, end_date_time, categories }) {
        const { rows } = await pool.query(
            `INSERT INTO events (name, description, start_date_time, end_date_time) 
             VALUES ($1, $2, $3, $4) RETURNING id`,
            [name, description, start_date_time, end_date_time]
        );

        const eventId = rows[0].id;
        for (const categoryId of categories) {
            await pool.query(`INSERT INTO event_categories (event_id, category_id) VALUES ($1, $2)`, [eventId, categoryId]);
        }

        return eventId;
    }

    static async getAll(filterCategory) {
        let query = `SELECT e.*, array_agg(c.name) AS categories 
                     FROM events e 
                     LEFT JOIN event_categories ec ON e.id = ec.event_id 
                     LEFT JOIN categories c ON ec.category_id = c.id`;
        
        if (filterCategory) {
            query += ` WHERE c.name = '${filterCategory}'`;
        }
        query += ` GROUP BY e.id ORDER BY e.start_date_time`;

        const { rows } = await pool.query(query);
        return rows;
    }

    static async update(id, { name, description, start_date_time, end_date_time, categories }) {
        await pool.query(
            `UPDATE events SET name=$1, description=$2, start_date_time=$3, end_date_time=$4 WHERE id=$5`,
            [name, description, start_date_time, end_date_time, id]
        );

        if (categories) {
            await pool.query(`DELETE FROM event_categories WHERE event_id=$1`, [id]);
            for (const categoryId of categories) {
                await pool.query(`INSERT INTO event_categories (event_id, category_id) VALUES ($1, $2)`, [id, categoryId]);
            }
        }
    }

    static async delete(id) {
        await pool.query(`DELETE FROM events WHERE id=$1`, [id]);
    }
}

module.exports = Event;
