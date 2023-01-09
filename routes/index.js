const router = require("express").Router();
const upload = require("../utils/multer");
const nodemailer = require('nodemailer');
const path = require('path');
// const filepath = path.join(__dirname, '../public/uploads');

// create a route to send email with nodemailer and form content
router.post("/send", upload.single("file"), async (req, res) => {
    const {selectSucursal,  nombre, dni, nacimiento,  email, telefono, mensaje, asunto } = req.body;
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.AUTH_USER,
            pass: process.env.AUTH_PASS,
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
            ciphers: "SSLv3"
          },
    });
    const mailOptions = {
        from: email,
        to: selectSucursal,
        subject: asunto,
        html: `
                <h2>Nombre: ${nombre}</h2>
                <p>Document: ${dni}</p>
                <p>Fecha de Nac.: ${nacimiento}</p>
                <p>Correo: ${email}</p>
                <p>Telefono: ${telefono}</p>
                <p>Mensaje: ${mensaje}</p>
        `,
        attachments: [
            {
                filename: req.file.originalname,
                path: req.file.path,
                contentType: req.file.mimetype,
            }
        ]
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("ERROR -------", err);
        } else {
            console.log("info", info);
        }
    }),
    res.sendStatus(200);
});

module.exports = router;