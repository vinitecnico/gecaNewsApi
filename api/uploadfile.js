'use strict';
const status = require('http-status');
const FileReader = require('filereader');
const moment = require('moment');
const fetch = require('isomorphic-fetch');
const multer = require('multer');
const Dropbox = require('dropbox').Dropbox;
const config = require('../config/config');
const dbx = new Dropbox({ accessToken: config.keyDropbox, fetch: fetch });


module.exports = function (app) {    
    const storage = multer.memoryStorage({});
    const upload = multer({ storage: storage }).single('file');
    app.post('/api/uploadfile', function (req, res) {
        const params = req.body;
        upload(req, res, function (err) {
            if (err) {
                res.json({ error_code: 1, err_desc: err });
                return;
            } else {
                dbx.filesUpload({ path: `/gecanews/${req.file.originalname}`, contents: req.file.buffer, mode: 'overwrite' })
                    .then((result) => {
                        dbx.sharingCreateSharedLink({ path: `/gecanews/${req.file.originalname}` })
                            .then((resDpx) => {
                                resDpx.url = resDpx.url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
                                resDpx.url = resDpx.url.replace('?dl=0', '');
                                const data = {
                                    url: resDpx.url,
                                    fileName: req.file.originalname
                                };
                                res.status(status.OK).send(data);
                            });
                    })
                    .catch((error) => {
                        response.status(status.BAD_REQUEST).send(JSON.stringify(error));
                    });
            }
        });
    });
}
