
--
-- Dumping data for table `articles`
--


LOCK TABLES `categorys` WRITE;
/*!40000 ALTER TABLE `categorys` DISABLE KEYS */;
INSERT INTO `categorys` VALUES (1,'Mode');
INSERT INTO `categorys` VALUES (2,'Maison');
INSERT INTO `categorys` VALUES (3,'Téléphones');
INSERT INTO `categorys` VALUES (4,'Loisirs');
INSERT INTO `categorys` VALUES (5,'Electronique');
INSERT INTO `categorys` VALUES (6,'Bijoux et montres');
INSERT INTO `categorys` VALUES (7,'Sacs et chaussures');
INSERT INTO `categorys` VALUES (8,'Beauté, santé et cheveux');
INSERT INTO `categorys` VALUES (9,'Bricolage et outils');
INSERT INTO `categorys` VALUES (10,'Autres');
/*!40000 ALTER TABLE `categorys` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `sub_categorys` WRITE;
/*!40000 ALTER TABLE `sub_categorys` DISABLE KEYS */;
INSERT INTO `sub_categorys` VALUES (1,'sneakers',7);
INSERT INTO `sub_categorys` VALUES (2,'coiffure',1);
INSERT INTO `sub_categorys` VALUES (3,'ordinateurs',5);
INSERT INTO `sub_categorys` VALUES (4,'maquillage',8);
INSERT INTO `sub_categorys` VALUES (5,'bijoux',6);
INSERT INTO `sub_categorys` VALUES (6,'jardin',2);
INSERT INTO `sub_categorys` VALUES (7,'accessoires',5);
INSERT INTO `sub_categorys` VALUES (8,'tablettes',5);
INSERT INTO `sub_categorys` VALUES (9,'cuir',7);
INSERT INTO `sub_categorys` VALUES (10,'vêtements',1);
INSERT INTO `sub_categorys` VALUES (11,'vélos',4);
INSERT INTO `sub_categorys` VALUES (12,'livres',4);
INSERT INTO `sub_categorys` VALUES (13,'décorations',2);
INSERT INTO `sub_categorys` VALUES (14,'iPhone',3);
INSERT INTO `sub_categorys` VALUES (15,'Samsung',3);
INSERT INTO `sub_categorys` VALUES (16,'équipement',9);
INSERT INTO `sub_categorys` VALUES (17,'jeux',4);
INSERT INTO `sub_categorys` VALUES (18,'Autres',6);
/*!40000 ALTER TABLE `sub_categorys` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Loris Steve','TCHOUNANG DJANWOU','loris@professional.com','$2a$08$BJTVwUuhvpApEU8s7g52qu/9KbCoddxnUxVdSquqCd2C/gKmbkU9W','https://st4.depositphotos.com/1012074/20946/v/450/depositphotos_209469984-stock-illustration-flat-isolated-vector-illustration-icon.jpg','2022-06-30 19:23:38','Professional',612143456);
INSERT INTO `users` VALUES (2,'Imane','HAIF','imane@professional.com','$2a$08$BJTVwUuhvpApEU8s7g52qu/9KbCoddxnUxVdSquqCd2C/gKmbkU9W','','2022-06-30 19:23:38','Professional',610785956);
INSERT INTO `users` VALUES (3,'Roya','GHARBI','roya@professional.com','$2a$08$BJTVwUuhvpApEU8s7g52qu/9KbCoddxnUxVdSquqCd2C/gKmbkU9W','','2022-06-30 19:23:38','Professional',612147623);

INSERT INTO `users` VALUES (4,'Paul','DUPONT','paul@gmail.com','$2a$08$BJTVwUuhvpApEU8s7g52qu/9KbCoddxnUxVdSquqCd2C/gKmbkU9W','https://this-person-does-not-exist.com/img/avatar-720f90c7b6445626c3d16ed1868f3c75.jpg','2022-06-30 19:23:38','User',689043456);
INSERT INTO `users` VALUES (5,'Marie',' Marcil','marie@gmail.com','$2a$08$BJTVwUuhvpApEU8s7g52qu/9KbCoddxnUxVdSquqCd2C/gKmbkU9W','https://img.generation-nt.com/0001658404.webp','2022-06-30 19:23:38','User',731016458);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `catalogs` WRITE;
/*!40000 ALTER TABLE `catalogs` DISABLE KEYS */;
INSERT INTO `catalogs` VALUES (1,'Peinture','Paris 3',NULL,NULL,'https://s3-eu-west-1.amazonaws.com/legalstart/Images+fiches+pratiques+LS/BTP/peintre+en+batiment.jpg',1,0,1);
INSERT INTO `catalogs` VALUES (2,'Salon de coiffure','Saint-Denis',NULL,NULL,'https://www.francetvinfo.fr/pictures/-jyeUcFeB5aIXcHfOtpN0ot_K8o/0x378:4032x2646/944x531/filters:format(webp)/2021/04/10/phpdutG8G.jpg',1,0,2);
INSERT INTO `catalogs` VALUES (3,'Déménagements','Montparnasse',NULL,NULL,'https://cdn.paris.fr/paris/2019/07/24/huge-9f4db42086158289daf17934bc110424.jpg',1,0,3);
INSERT INTO `catalogs` VALUES (4,'Animalerie','Bobigny',NULL,NULL,'https://ad962edbae8ba7b03b7f-d10007df79b5b7a4e475a291e50a08cf.ssl.cf3.rackcdn.com/ouvrir-une-animalerie/ouvrir-une-animalerie.jpg',1,0,2);
INSERT INTO `catalogs` VALUES (5,'Bijoux','Paris 16',NULL,NULL,'https://img.freepik.com/vecteurs-libre/affichage-realiste-bijoux-or-argent-mannequins-noirs-surface-grise_1284-9644.jpg?w=2000',1,0,2);
INSERT INTO `catalogs` VALUES (6,'Jouets','Nanterre',NULL,NULL,'https://lesprosdelapetiteenfance.fr/sites/default/files/destockage-jouets-4.jpg',1,0,1);
INSERT INTO `catalogs` VALUES (7,'Boutique de vêtements','Saint-Cloud',NULL,NULL,'https://mobile-img.lpcdn.ca/lpca/924x/r3996/0f348dfab1e53527b8e0d42f43f2102f.jpeg',1,0,2);
INSERT INTO `catalogs` VALUES (8,'Chaussures','Rosny-sous-Bois',NULL,NULL,'https://www.l-empreinte-chaussure.com/themes/at_nova/assets/img/modules/appagebuilder/icon/hommes.jpg',1,0,1);
INSERT INTO `catalogs` VALUES (9,'Téléphone','Paris 10',NULL,NULL,'https://cdn.radiofrance.fr/s3/cruiser-production/2022/02/602cef4e-37dd-4db0-b577-9fd9e0d3e642/870x489_gettyimages-1279641265.jpg',1,0,1);

/*!40000 ALTER TABLE `catalogs` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `articles` WRITE;
/* AJOUTER SOUS CAT*/
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'Dégradé',15,'Coupe à la tondeuse - Homme',2,'https://guidelook.fr/wp-content/uploads/2020/06/coupe-degrade-court-homme.jpg',0);
INSERT INTO `articles` VALUES (2,'Collier en or',175,'Collier or 375 jaune médaille pour femme',5,'https://photos3.maty.com/0501042/V1/400/collier-or-375-jaune-medaille-42-cm.jpeg',1);
INSERT INTO `articles` VALUES (3,'Jeu Puissance 4',10,'Jeu pour petits et grands',17,'https://www.ludifolie.com/14057-thickbox_default/puissance-4.jpg',1);
INSERT INTO `articles` VALUES (4,'Pots de peinture',43,'Pots de peinture de différentes couleurs 2,5l',18,'https://www.monequerre.fr/wp-content/uploads/2020/02/shutterstock_1054088231-1-1024x607.jpg',1);
INSERT INTO `articles` VALUES (5,'Pinceaux de peinture',21,'Lot de pinceaux de peinture 12 pièces',18,'https://www.brico.fr/96407-large/pinceaux-peinture-acrylique-lot7-plat-rechampir.jpg',1);
INSERT INTO `articles` VALUES (6,'Service de déménagement',65,'Disponible dans toutes l Ile-de-France de 8h à 20h',18,'https://mademarche.fr/uploads/boxes-2624231-1280jpg5de84de5726b1-w1000.jpg',1);
INSERT INTO `articles` VALUES (7,'Jouet pour chien',16,'Brosse à dent jouet pour chien',17,'https://www.cdiscount.com/pdt2/0/8/2/1/700x700/auc0791352502082/rw/brosse-a-dent-chien-jouet-a-macher-pour-chien-bl.jpg',1);
INSERT INTO `articles` VALUES (8,'Basket Nike',90,'Disponible de la taille 37 à 42',1,'https://images.bfmtv.com/gPVpGxiV6oi0meCr2Q4r7f3PxRc=/0x355:864x841/864x0/images/nike-nouveautes-976079.jpg',1);
INSERT INTO `articles` VALUES (9,'Boucles d oreille',18,'Trio de boucles d oreille ornées de pierres blanches',5,'https://cdn.shopify.com/s/files/1/0267/5569/4640/products/image_6a6be5cc-7be3-4838-8ea6-806a67ee1ce2_2000x.jpg?v=1614612700',1);
INSERT INTO `articles` VALUES (10,'Camionnette',25,'Véhicule de déménagement Renault. Prix à l heure',18,'https://professionnels.renault.fr/agg/vn/unique/ONE_DACIA_PP_LARGE_DENSITY1/r_brandSite_carPicker_1.png?uri=https%3A%2F%2Fcdn.group.renault.com%2Fpackshots%2Frenault-master-f62-ph2',1);
INSERT INTO `articles` VALUES (11,'IPhone 12',576,'IPhone 12 64Go de couleur bleu',14,'https://m.economictimes.com/thumb/msid-91978776,width-2121,height-1414,resizemode-4,imgsize-160540/iphone-12.jpg',1);
INSERT INTO `articles` VALUES (12,'Robe à fleur verte',27,'Robe longue à fleur',10,'https://cdn.shopify.com/s/files/1/0521/7720/7458/products/S71d534926f2148ab9d1502875a231569M_1600x.jpg?v=1649616383',1);
INSERT INTO `articles` VALUES (13,'Pantalon',25,'Pantalon homme droit gris',10,'https://www.vibs.com/dw/image/v2/BCHM_PRD/on/demandware.static/-/Sites-Bonobo_master/default/dwf5d14172/pantalon-chino-ceinture-gris-fonc-homme-dc-36125271110620741.jpg?sw=300&sh=400',1);
INSERT INTO `articles` VALUES (14,'T-shirt',12,'T-shirt homme vert avec pitite fleur',10,'https://media.lexception.com/img/products/cuisse-de-grenouille/122994-cuisse-de-grenouille-tshirt-01-0380-0400.jpg',1);

INSERT INTO `articles` VALUES (15,'T-shirt Blanc',7.99,'T-shirt blanc',11,'https://agnesb-agnesb-com-storage.omn.proximis.com/Imagestorage/imagesSynchro/0/0/8549751afbff06c38dcae58ee01a808bd850ca3c_2653J000_010_1.jpeg',1);
INSERT INTO `articles` VALUES (16,'Poupée',35,'Poupée Barbie',17,'https://cdn.pixabay.com/photo/2016/03/16/15/18/beauty-1260975__480.jpg');
INSERT INTO `articles` VALUES (17,'Chien',165,'Labrador',18,'https://cdn.pixabay.com/photo/2016/02/11/17/00/dog-1194087_960_720.jpg');
INSERT INTO `articles` VALUES (18,'Rongeur',30,'Hamster',18,'https://cdn.pixabay.com/photo/2018/02/17/17/50/cute-3160464_960_720.jpg');
INSERT INTO `articles` VALUES (19,'Débarrassage',45,'Descente meuble aux encombrements',18,'https://luludansmarue.org/wp-content/uploads/2021/06/Illu-gb-encombrants.png');
INSERT INTO `articles` VALUES (20,'Déplacement',57,'Déplacer des meubles',18,'https://luludansmarue.org/wp-content/uploads/2021/06/Gros-Bras-Illu-2-180x159.png');
INSERT INTO `articles` VALUES (21,'Pulls',43.99,'Lot de 3 pulls',10,'https://images.pexels.com/photos/1030946/pexels-photo-1030946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
INSERT INTO `articles` VALUES (22,'Boucles oreilles',78.90,'Boucles oreilles argent et or',5,'https://images.pexels.com/photos/12194352/pexels-photo-12194352.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `catalog_has_articles` WRITE;
/*!40000 ALTER TABLE `catalog_has_articles` DISABLE KEYS */;
INSERT INTO `catalog_has_articles` VALUES (2,1,1,1,NULL);
INSERT INTO `catalog_has_articles` VALUES (5,2,5,1,NULL);
INSERT INTO `catalog_has_articles` VALUES (6,3,41,1,NULL);
INSERT INTO `catalog_has_articles` VALUES (1,4,23,1,NULL);
INSERT INTO `catalog_has_articles` VALUES (1,5,11,1,NULL);
INSERT INTO `catalog_has_articles` VALUES (3,6,1,1,NULL);
INSERT INTO `catalog_has_articles` VALUES (6,7,25,1,NULL);
INSERT INTO `catalog_has_articles` VALUES (8,8,12,1,NULL);
INSERT INTO `catalog_has_articles` VALUES (5,9,43,1,NULL);
INSERT INTO `catalog_has_articles` VALUES (3,10,1,1,NULL);
INSERT INTO `catalog_has_articles` VALUES (9,11,39,1,NULL);
INSERT INTO `catalog_has_articles` VALUES (7,12,17,1,NULL);
INSERT INTO `catalog_has_articles` VALUES (7,13,45,1,NULL);
INSERT INTO `catalog_has_articles` VALUES (7,14,25,1,NULL);

INSERT INTO `catalog_has_articles` VALUES (7,15,10,1,NULL);
INSERT INTO `catalog_has_articles` VALUES (6,16,29,1,NULL);
INSERT INTO `catalog_has_articles` VALUES (4,17,3,1,NULL);
INSERT INTO `catalog_has_articles` VALUES (4,18,5,1,NULL);
INSERT INTO `catalog_has_articles` VALUES (3,19,1,1,NULL);
INSERT INTO `catalog_has_articles` VALUES (3,20,1,1,NULL);
INSERT INTO `catalog_has_articles` VALUES (7,21,23,1,NULL);
INSERT INTO `catalog_has_articles` VALUES (5,22,54,1,NULL);


/*!40000 ALTER TABLE `catalog_has_articles` ENABLE KEYS */;
UNLOCK TABLES;
