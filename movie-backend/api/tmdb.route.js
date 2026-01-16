import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();
const TMDB_BASE = 'https://api.themoviedb.org/3';

router.get("/discover", async (req, res) => {
    try {
        const page = req.query.page || 1;

        const url = 
            `${TMDB_BASE}/discover/movie?sort_by=popularity.desc` +
            `&include_adult=false&language=en-US&page=${page}` +
            `&api_key=${process.env.TMDB_API_KEY}`;

        const r = await fetch(url);
        const data = await r.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "TMDB discover failed" });
    }
    });

    router.get("/search", async (req, res) => {
        try {
        const query = req.query.query || "";
        const page = req.query.page || 1;
    
        const url =
            `${TMDB_BASE}/search/movie?include_adult=false&language=en-US` +
            `&query=${encodeURIComponent(query)}&page=${page}` +
            `&api_key=${process.env.TMDB_API_KEY}`;

        const r = await fetch(url);
        const data = await r.json();
        res.json(data);
        } catch (err) {
        res.status(500).json({ error: "TMDB search failed" });
        }
    });

export default router;
