// import connection
import db from "../config/database.js";
import {sendEmail} from "../mails/mails.js";


// Get All Carts
export const getCarts = (result) => {
    db.query("select 'services' as cart_name, cs.cart_id, cs.cart_service_id as cart_product_id, cs.cart_quantity, s.service_id as product_id, s.name, s.description, s.price, s.stripe_price, s.reduction, s.image from carts RIGHT JOIN carts_service cs on carts.cart_id = cs.cart_id LEFT JOIN services s on cs.service_id = s.service_id WHERE carts.customer_id = ? UNION select 'goods' as cart_name, cg.cart_id, cg.cart_good_id as cart_product_id, cg.cart_quantity, g.name, g.description, g.price, g.stripe_price, g.reduction, g.image from carts RIGHT JOIN carts_good cg on carts.cart_id = cg.cart_id LEFT JOIN goods g on cg.good_id = g.good_id WHERE carts.customer_id = ?", (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Get Single Carts
export const getCartsById = (id, result) => {
    db.query("SELECT * FROM carts WHERE cart_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Get Single Carts
export const getCartsByCustomerId = (customer_id, result) => {
    db.query("select carts.cart_id,\n" +
        "       carts.customer_id,\n" +
        "       carts.status,\n" +
        "       'services'         as cart_name,\n" +
        "       cs.cart_service_id as cart_product_id,\n" +
        "       cs.cart_quantity,\n" +
        "       s.service_id       as product_id,\n" +
        "       s.name,\n" +
        "       s.description,\n" +
        "       s.price,\n" +
        "       s.stripe_price,\n" +
        "       s.reduction,\n" +
        "       s.image\n" +
        "from carts\n" +
        "         RIGHT JOIN carts_service cs on carts.cart_id = cs.cart_id\n" +
        "         LEFT JOIN services s on cs.service_id = s.service_id\n" +
        "WHERE status = 0 AND customer_id = ?\n" +
        "UNION\n" +
        "select carts.cart_id,\n" +
        "       carts.customer_id,\n" +
        "       carts.status,\n" +
        "       'goods'         as cart_name,\n" +
        "       cg.cart_good_id as cart_product_id,\n" +
        "       cg.cart_quantity,\n" +
        "       g.good_id       as product_id,\n" +
        "       g.name,\n" +
        "       g.description,\n" +
        "       g.price,\n" +
        "       g.stripe_price,\n" +
        "       g.reduction,\n" +
        "       g.image\n" +
        "from carts\n" +
        "         RIGHT JOIN carts_good cg on carts.cart_id = cg.cart_id\n" +
        "         LEFT JOIN goods g on cg.good_id = g.good_id\n" +
        "WHERE status = 0 AND customer_id = ?;", [customer_id, customer_id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            //const invoice = '<h1>Voici votre facture..</h1>';
            //sendEmail('corentin.lechene@orange.fr', 'test', invoice);
            result({valid: true, result: results});
        }
    });
}

// Insert Carts to Database
export const insertCarts = (data, result) => {
    db.query("INSERT INTO carts SET ?", [data], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.affectedRows !== 0) {
            result({valid: true, result: "Colonne ajoutée"});
        }
    });
}

// Update Carts to Database
export const updateCartsById = (customer_id, id, result) => {
    //Valider le panier
    db.query("UPDATE carts SET status = 1 WHERE customer_id = ? AND cart_id = ?", [customer_id, id], (err, resultsCarts) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            //Le panier est vide.
            //Envoi du mail avec la facture
            sendEmail('corentin.lechene@orange.fr', 'test', "<h1>Votre facture</h1>");
            //supprimer les prix des produits stripe
            //Redirection
            result({valid: true, result: resultsCarts});
        }
    });
}

// Delete Carts to Database
export const deleteCartsById = (id, result) => {
    db.query("DELETE FROM carts WHERE cart_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.affectedRows !== 0) {
            result({valid: true, result: "Colonne supprimée"});
        } else {
            result({valid: false, reason: "Colonne non supprimée ou inexistante"});
        }
    });
}