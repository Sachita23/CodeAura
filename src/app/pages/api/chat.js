import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req = NextApiRequest, res = NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const response = await fetch("YOUR_GOOGLE_COLAB_API_ENDPOINT", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: req.body.prompt })
            });

            const data = await response.json();

            if (response.ok) {
                return res.status(200).json(data);
            } else {
                return res.status(500).json({ error: 'Error from Colab API' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
