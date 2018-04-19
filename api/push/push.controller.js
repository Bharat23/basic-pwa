import { EndPointModel } from './push.model';

export const storeEndpoint = (req, res) => {
    console.log(req.body)
    let { url, name } = req.body;
    console.log(url, name);
    let userAgent = req.headers['user-agent'];
    EndPointModel
    .create({ url, name, userAgent })
    .then(data => res.json(data));
};