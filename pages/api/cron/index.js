/* ***************
 *      RUTA:    *
 *   api/cron/  *
 * ***************/

export default async function handler(req, res
) {
    if (req.method === 'GET') {
        try {
            console.log("HELLO WORLD")
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: err.message });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
