/* ***************
 *      RUTA:    *
 *   api/cron/  *
 * ***************/

const SECRET = process.env.NEXTAUTH_SECRET



export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { authorization } = req.headers;

            console.log("-----------------FUNCIONA_CRON_JOB---------------")

            if (authorization === `Bearer ${SECRET}`) {
                res.status(200).json({ success: true });
            } else {
                res.status(401).json({ success: false });
            }
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: err.message });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
