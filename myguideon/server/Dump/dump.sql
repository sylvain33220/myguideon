-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: myguideon
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `currency` enum('USD','EUR') NOT NULL DEFAULT 'EUR',
  `imageCover` varchar(500) DEFAULT NULL,
  `location` varchar(150) NOT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `language` varchar(50) DEFAULT 'English',
  `duration` varchar(50) DEFAULT NULL,
  `max_participants` int DEFAULT '20',
  `availability` json DEFAULT NULL,
  `age_limit` int DEFAULT NULL,
  `category` enum('Aventure','Culture','Sport','Gastronomie') DEFAULT 'Aventure',
  `status` enum('Published','Draft') DEFAULT 'Published',
  `is_favorite` tinyint DEFAULT '0',
  `add_to_plan` tinyint DEFAULT '0',
  `created_by` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `image_cover_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  KEY `image_cover_id` (`image_cover_id`),
  CONSTRAINT `activities_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `userpro` (`id`) ON DELETE CASCADE,
  CONSTRAINT `activities_ibfk_2` FOREIGN KEY (`image_cover_id`) REFERENCES `images` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (1,'nouvelle activité','Description test',100.00,'USD','/assets/img/1745570172861-379519449.jpg','france',NULL,NULL,NULL,'24',NULL,NULL,NULL,NULL,'Draft',0,0,1,'2025-04-25 08:36:12',NULL,NULL),(108,'Plongée','Plongée sous-marine',120.00,'USD',NULL,'Marseille',NULL,NULL,'English',NULL,20,NULL,NULL,'Aventure','Published',0,0,1,'2025-04-25 08:36:13',NULL,NULL),(109,'Yoga','Séance de yoga',50.00,'USD',NULL,'Paris',NULL,NULL,'English',NULL,20,NULL,NULL,'Aventure','Published',0,0,1,'2025-04-25 08:36:13',NULL,NULL);
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activity_images`
--

DROP TABLE IF EXISTS `activity_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `activity_id` int NOT NULL,
  `image_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `activity_id` (`activity_id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `activity_images_ibfk_1` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`) ON DELETE CASCADE,
  CONSTRAINT `activity_images_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_images`
--

LOCK TABLES `activity_images` WRITE;
/*!40000 ALTER TABLE `activity_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `activity_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `availabilities`
--

DROP TABLE IF EXISTS `availabilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `availabilities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `activity_id` int NOT NULL,
  `date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `max_participants` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('active','full','cancelled') DEFAULT 'active',
  `is_available` tinyint DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `idx_activity_id` (`activity_id`),
  CONSTRAINT `availabilities_ibfk_1` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `availabilities`
--

LOCK TABLES `availabilities` WRITE;
/*!40000 ALTER TABLE `availabilities` DISABLE KEYS */;
INSERT INTO `availabilities` VALUES (96,11,'2025-03-10','11:00:00','13:00:00',20,'2025-03-06 17:18:12','2025-03-06 17:18:12','active',1);
/*!40000 ALTER TABLE `availabilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_orders`
--

DROP TABLE IF EXISTS `cart_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `userpro_id` int DEFAULT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','paid','cancelled') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `quantity` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `userpro_id` (`userpro_id`),
  KEY `fk_feedbacks_user_client` (`user_id`),
  CONSTRAINT `cart_orders_ibfk_1` FOREIGN KEY (`userpro_id`) REFERENCES `userpro` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_feedbacks_user_client` FOREIGN KEY (`user_id`) REFERENCES `user_client` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_orders`
--

LOCK TABLES `cart_orders` WRITE;
/*!40000 ALTER TABLE `cart_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `destination`
--

DROP TABLE IF EXISTS `destination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destination` (
  `id` int NOT NULL AUTO_INCREMENT,
  `basic_info` json NOT NULL,
  `gallery` json DEFAULT NULL,
  `activity` json DEFAULT NULL,
  `pratical_info` json DEFAULT NULL,
  `imageCover` varchar(2000) DEFAULT NULL,
  `activities` json DEFAULT NULL,
  `culture` json DEFAULT NULL,
  `info` json DEFAULT NULL,
  `historical` json DEFAULT NULL,
  `author` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destination`
--

LOCK TABLES `destination` WRITE;
/*!40000 ALTER TABLE `destination` DISABLE KEYS */;
INSERT INTO `destination` VALUES (6,'{\"lat\": \"5.6789\", \"lon\": \"1.2345\", \"budget\": \"économique\", \"status\": \"active\", \"address\": \"France\", \"imgpath\": null, \"currency\": \"euro\", \"language\": \"fr\", \"categories\": [\"nature\"], \"destinationName\": \"Test City\"}',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'test_admin'),(7,'{\"lat\": \"5.6789\", \"lon\": \"1.2345\", \"budget\": \"économique\", \"status\": \"active\", \"address\": \"France\", \"imgpath\": null, \"currency\": \"euro\", \"language\": \"fr\", \"categories\": [\"nature\"], \"destinationName\": \"Test City\"}',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'test_admin'),(8,'{\"lat\": \"5.6789\", \"lon\": \"1.2345\", \"budget\": \"économique\", \"status\": \"active\", \"address\": \"France\", \"imgpath\": null, \"currency\": \"euro\", \"language\": \"fr\", \"categories\": [\"nature\"], \"destinationName\": \"Test City\"}',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'test_admin'),(9,'{\"lat\": \"5.6789\", \"lon\": \"1.2345\", \"budget\": \"économique\", \"status\": \"active\", \"address\": \"France\", \"imgpath\": null, \"currency\": \"euro\", \"language\": \"fr\", \"categories\": [\"nature\"], \"destinationName\": \"Test City\"}',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'test_admin'),(10,'{\"lat\": \"5.6789\", \"lon\": \"1.2345\", \"budget\": \"économique\", \"status\": \"active\", \"address\": \"France\", \"imgpath\": null, \"currency\": \"euro\", \"language\": \"fr\", \"categories\": [\"nature\"], \"destinationName\": \"Test City\"}',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'test_admin'),(11,'{\"lat\": \"5.6789\", \"lon\": \"1.2345\", \"budget\": \"économique\", \"status\": \"active\", \"address\": \"France\", \"imgpath\": null, \"currency\": \"euro\", \"language\": \"fr\", \"categories\": [\"nature\"], \"destinationName\": \"Test City\"}',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'test_admin'),(12,'{\"lat\": \"5.6789\", \"lon\": \"1.2345\", \"budget\": \"économique\", \"status\": \"active\", \"address\": \"France\", \"imgpath\": null, \"currency\": \"euro\", \"language\": \"fr\", \"categories\": [\"nature\"], \"destinationName\": \"Test City\"}',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'test_admin'),(13,'{\"lat\": \"5.6789\", \"lon\": \"1.2345\", \"budget\": \"économique\", \"status\": \"active\", \"address\": \"France\", \"imgpath\": null, \"currency\": \"euro\", \"language\": \"fr\", \"categories\": [\"nature\"], \"destinationName\": \"Test City\"}',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'test_admin'),(14,'{\"lat\": \"5.6789\", \"lon\": \"1.2345\", \"budget\": \"économique\", \"status\": \"active\", \"address\": \"France\", \"imgpath\": null, \"currency\": \"euro\", \"language\": \"fr\", \"categories\": [\"nature\"], \"destinationName\": \"Test City\"}',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'test_admin'),(15,'{\"lat\": \"5.6789\", \"lon\": \"1.2345\", \"budget\": \"économique\", \"status\": \"active\", \"address\": \"France\", \"imgpath\": null, \"currency\": \"euro\", \"language\": \"fr\", \"categories\": [\"nature\"], \"destinationName\": \"Test City\"}',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'test_admin'),(16,'{\"lat\": \"5.6789\", \"lon\": \"1.2345\", \"budget\": \"économique\", \"status\": \"active\", \"address\": \"France\", \"imgpath\": null, \"currency\": \"euro\", \"language\": \"fr\", \"categories\": [\"nature\"], \"destinationName\": \"Test City\"}',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'test_admin'),(17,'{\"lat\": \"5.6789\", \"lon\": \"1.2345\", \"budget\": \"économique\", \"status\": \"active\", \"address\": \"France\", \"imgpath\": null, \"currency\": \"euro\", \"language\": \"fr\", \"categories\": [\"nature\"], \"destinationName\": \"Test City\"}',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'test_admin'),(18,'{\"lat\": \"5.6789\", \"lon\": \"1.2345\", \"budget\": \"économique\", \"status\": \"active\", \"address\": \"France\", \"imgpath\": null, \"currency\": \"euro\", \"language\": \"fr\", \"categories\": [\"nature\"], \"destinationName\": \"Test City\"}',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'test_admin'),(19,'{\"lat\": \"5.6789\", \"lon\": \"1.2345\", \"budget\": \"économique\", \"status\": \"active\", \"address\": \"France\", \"imgpath\": null, \"currency\": \"euro\", \"language\": \"fr\", \"categories\": [\"nature\"], \"destinationName\": \"Test City\"}',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'test_admin'),(20,'{\"lat\": \"5.6789\", \"lon\": \"1.2345\", \"budget\": \"économique\", \"status\": \"active\", \"address\": \"France\", \"imgpath\": null, \"currency\": \"euro\", \"language\": \"fr\", \"categories\": [\"nature\"], \"destinationName\": \"Test City\"}',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'test_admin'),(43,'{\"lat\": \"5.6789\", \"lon\": \"1.2345\", \"budget\": \"économique\", \"status\": \"active\", \"address\": \"France\", \"imgpath\": null, \"currency\": \"euro\", \"language\": \"fr\", \"categories\": [\"nature\"], \"destinationName\": \"Test City\"}',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'test_admin');
/*!40000 ALTER TABLE `destination` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedbacks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `activity_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  `rating` tinyint NOT NULL,
  `comment` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `things_to_do_id` int DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `destination_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_feedbacks_user` (`user_id`),
  KEY `fk_thing_to_do_id` (`things_to_do_id`),
  KEY `feedbacks_ibfk_1` (`activity_id`),
  CONSTRAINT `feedbacks_ibfk_1` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`),
  CONSTRAINT `fk_feedbacks_user` FOREIGN KEY (`user_id`) REFERENCES `user_client` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_thing_to_do_id` FOREIGN KEY (`things_to_do_id`) REFERENCES `things_to_do` (`id`) ON DELETE SET NULL,
  CONSTRAINT `chk_feedback_rating` CHECK ((`rating` between 0 and 10))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

LOCK TABLES `feedbacks` WRITE;
/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedbacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(500) NOT NULL,
  `alt_text` varchar(250) DEFAULT NULL,
  `description` text,
  `type` enum('profile','cover','gallery','activity') DEFAULT 'gallery',
  `owner_id` int DEFAULT NULL,
  `owner_type` enum('user','userpro','admin','activity','things_to_do') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;

/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media_messages`
--

DROP TABLE IF EXISTS `media_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message_id` int DEFAULT NULL,
  `file_url` varchar(255) NOT NULL,
  `file_type` enum('image','video','document') NOT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media_messages`
--

LOCK TABLES `media_messages` WRITE;
/*!40000 ALTER TABLE `media_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `media_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int NOT NULL,
  `sender_type` enum('user_client','userpro','user_admin') NOT NULL,
  `receiver_id` int NOT NULL,
  `receiver_type` enum('user_client','userpro','user_admin') NOT NULL,
  `content` text,
  `media_url` varchar(255) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_sender` (`sender_id`,`sender_type`),
  KEY `idx_receiver` (`receiver_id`,`receiver_type`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'create_userpro','Créer un utilisateur professionnel'),(2,'view_userpro','Voir les utilisateurs professionnels'),(3,'update_userpro','Mettre à jour un utilisateur professionnel'),(4,'delete_userpro','Supprimer un utilisateur professionnel'),(5,'create_activity','Créer une activité'),(6,'read_activity','Voir les activités'),(7,'update_activity','Mettre à jour une activité'),(8,'delete_activity','Supprimer une activité'),(9,'manage_users','Gérer les utilisateurs'),(10,'view_statistics','Voir les statistiques'),(11,'update_password_userpro','Mettre à jour le mot de passe d un utilisateur professionnel'),(12,'add_availability',' ceéer une validité pour une activité'),(13,'update_availability',' modifier une validité pour une activité'),(14,'delete_availability',' supprimer une validité pour une activité'),(15,'view_all_reservations','Voir toutes les réservations '),(16,'view_reservation','Voir une réservation spécifique '),(17,'add_reservation','Ajouter une reservation'),(18,'update_reservation','Modifier une reservation'),(19,'delete_reservation','Supprimer un reservation'),(20,'add_permission','Créer une nouvelle permission'),(21,'assign_role','Assigner un role à un userpro'),(22,'add_new_permission','Ajouter une permission à un role'),(23,'assign_role_admin','Assigner un role à un admin'),(24,'remove_permission','supprimer une permission à un role'),(25,'manage_payments','Gérer les paiements'),(26,'view_userclient','Voir la liste des utilisateurs clients'),(27,'update_userclient','Mettre à jour un utilisateur client'),(28,'delete_userclient','Supprimer un utilisateur client'),(29,'update_password_userclient','Mettre à jour le mot de passe d’un utilisateur client'),(30,'create_cart_order','Créer une commande'),(31,'view_cart_order','Voir une commande'),(32,'view_all_orders_by_user','Voir toutes les commandes d\'un utilisateur'),(33,'update_cart_order','Mettre à jour le statut d\'une commande'),(34,'delete_cart_order','Supprimer une commande'),(35,'post_feedbacks','poster un avis et une note'),(36,'update_feedbacks','modifier un avis et une note'),(37,'delete_feedbacks','supprimer un avis et une note'),(38,'add_admin','Ajouter un admin'),(39,'view_admin','Voir les admin'),(40,'update_admin','Modifier un admin'),(41,'delete_admin','Supprimer un admin'),(42,'view_permissions','voir les permissions'),(43,'add_permissions','Ajouter des permissions'),(44,'update_permissions','Modifier une permissions'),(45,'assign_permissions','Assigner une permission à un rôle'),(64,'manage_payments','Gérer les paiements'),(65,'manage_payments','Gérer les paiements');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `activity_id` int NOT NULL,
  `date` date NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','confirmed','cancelled') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `activity_id` (`activity_id`),
  KEY `fk_reservations_user_client` (`user_id`),
  CONSTRAINT `fk_reservations_user_client` FOREIGN KEY (`user_id`) REFERENCES `user_client` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permissions` (
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
INSERT INTO `role_permissions` VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(1,11),(1,12),(1,13),(1,14),(1,15),(1,16),(1,17),(1,18),(1,19),(1,20),(1,21),(1,22),(1,23),(1,24),(1,26),(1,27),(1,28),(1,29),(1,30),(1,31),(1,32),(1,33),(1,34),(1,35),(1,36),(1,37),(1,38),(1,39),(1,40),(1,41),(1,42),(1,43),(1,44),(1,45),(2,5),(2,7),(2,8),(2,11),(2,12),(2,13),(2,14),(2,15),(2,16),(2,17),(2,18),(2,19),(2,31),(2,32),(2,33),(3,6),(3,7),(3,12),(3,13),(3,14),(3,16),(3,17),(3,18),(3,19),(3,26),(3,27),(3,28),(3,29),(3,30),(3,31),(3,32),(3,35),(3,36),(3,37),(4,5),(4,7),(4,8),(4,12),(4,13),(4,14),(4,39),(4,41);
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin'),(4,'admintiers'),(3,'userclient'),(2,'userpro');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `things_to_do`
--

DROP TABLE IF EXISTS `things_to_do`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `things_to_do` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `adress` varchar(500) NOT NULL,
  `destination_id` int DEFAULT NULL,
  `description` text NOT NULL,
  `longitude` varchar(500) DEFAULT NULL,
  `icon` text NOT NULL,
  `gallery` json DEFAULT NULL,
  `destination_name` varchar(500) NOT NULL,
  `latitude` varchar(500) DEFAULT NULL,
  `category` varchar(500) DEFAULT NULL,
  `status` enum('active','inactive','archived') DEFAULT 'inactive',
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `destination_id` (`destination_id`),
  CONSTRAINT `things_to_do_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `destination` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `things_to_do`
--

LOCK TABLES `things_to_do` WRITE;
/*!40000 ALTER TABLE `things_to_do` DISABLE KEYS */;
INSERT INTO `things_to_do` VALUES (7,'Balade test','Rue test',6,'Découverte sympa','2.2','?','[]','Test City','48.8','nature','active',NULL),(8,'Balade test','Rue test',7,'Découverte sympa','2.2','?','[]','Test City','48.8','nature','active',NULL),(9,'Balade test','Rue test',8,'Découverte sympa','2.2','?','[]','Test City','48.8','nature','active',NULL),(10,'Balade test','Rue test',9,'Découverte sympa','2.2','?','[]','Test City','48.8','nature','active',NULL),(11,'Balade test','Rue test',10,'Découverte sympa','2.2','?','[]','Test City','48.8','nature','active',NULL),(12,'Balade test','Rue test',11,'Découverte sympa','2.2','?','[]','Test City','48.8','nature','active',NULL),(13,'Balade test','Rue test',12,'Découverte sympa','2.2','?','[]','Test City','48.8','nature','active',NULL),(14,'Balade test','Rue test',13,'Découverte sympa','2.2','?','[]','Test City','48.8','nature','active',NULL),(15,'Balade test','Rue test',14,'Découverte sympa','2.2','?','[]','Test City','48.8','nature','active',NULL),(16,'Balade test','Rue test',15,'Découverte sympa','2.2','?','[]','Test City','48.8','nature','active',NULL),(17,'Balade test','Rue test',16,'Découverte sympa','2.2','?','[]','Test City','48.8','nature','active',NULL),(18,'Balade test','Rue test',17,'Découverte sympa','2.2','?','[]','Test City','48.8','nature','active',NULL),(19,'Balade test','Rue test',18,'Découverte sympa','2.2','?','[]','Test City','48.8','nature','active',NULL),(20,'Balade test','Rue test',19,'Découverte sympa','2.2','?','[]','Test City','48.8','nature','active',NULL),(21,'Balade test','Rue test',20,'Découverte sympa','2.2','?','[]','Test City','48.8','nature','active',NULL),(33,'Balade test','Rue test',43,'Découverte sympa','2.2','?','[]','Test City','48.8','nature','active',NULL);
/*!40000 ALTER TABLE `things_to_do` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_admin`
--

DROP TABLE IF EXISTS `user_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `reset_code` varchar(500) DEFAULT NULL,
  `is_first_time` tinyint(1) DEFAULT '1',
  `profile_image` varchar(300) DEFAULT NULL,
  `role_id` int DEFAULT '4',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `profile_image_id` (`profile_image`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_admin`
--

LOCK TABLES `user_admin` WRITE;
/*!40000 ALTER TABLE `user_admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_client`
--

DROP TABLE IF EXISTS `user_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_client` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text,
  `city` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `role_id` int NOT NULL DEFAULT '3',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `experience_rating` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_userclient_role` (`role_id`),
  CONSTRAINT `fk_userclient_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_client`
--

LOCK TABLES `user_client` WRITE;
/*!40000 ALTER TABLE `user_client` DISABLE KEYS */;
INSERT INTO `user_client` VALUES (4,'Test','Client','testuser1742314625899@example.com','$argon2id$v=19$m=65536,t=4,p=2$9n8S4TKIQPaqpAMz0eWn2A$4dOT1hRsnzPDZvpF7m8uAMywgsaC2j5GqmKozwF9Ud8','0123456789','123 Rue Test','TestVille','France','75000','/assets/img/1742314625966-112781238.jpg',3,'2025-03-18 16:17:06','2025-03-18 16:17:06',NULL),(5,'Test','Client','testuser1742315016881@example.com','$argon2id$v=19$m=65536,t=4,p=2$TuXgjDzWzwZ5J1wgw+SdDA$ct4p1j0w1BXVgDU6PgilhssiBrwdJHOV4yutmeB1EGc','0123456789','123 Rue Test','TestVille','France','75000','/assets/img/1742315016962-953581042.jpg',3,'2025-03-18 16:23:37','2025-03-18 16:23:37',NULL),(6,'HACKER','Client','testuser1742315054410@example.com','$argon2id$v=19$m=65536,t=4,p=2$9otNV+JvDaPFbj/aPpTdDw$bmtiXnQkNCGA/SfpmBLQ+1pSWYaxubpGsUkS6fF5zIw','0123456789','123 Rue Test','VilleHackée','France','75000','/assets/img/1742315054471-772689367.jpg',3,'2025-03-18 16:24:14','2025-03-19 08:30:03',NULL);
/*!40000 ALTER TABLE `user_client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userpro`
--

DROP TABLE IF EXISTS `userpro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userpro` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` text NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `company_name` varchar(200) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `description` text,
  `profile_image` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_verified` tinyint DEFAULT '0',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `userpro_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userpro`
--

LOCK TABLES `userpro` WRITE;
/*!40000 ALTER TABLE `userpro` DISABLE KEYS */;
INSERT INTO `userpro` VALUES (1,'Test Pro','testpro@example.com','passwordhash','123456789','Test Company','123 Street','Description courte','/images/profile.jpg','2025-03-03 12:22:10',1,'2025-03-04 13:14:19',NULL),(2,'UserProTest','userPro@email.com','hashedpass','1234567890','companyName',NULL,NULL,NULL,'2025-03-21 14:17:50',0,'2025-03-21 14:17:50',NULL),(4,'name with role','testRole@example.com','$argon2id$v=19$m=65536,t=3,p=4$93bX3cR0+eIIboZ2eHBHhQ$0fWYnsKd2JQ3EsUbOu3109DZZxVgdK/RTFAlt8UzUnA','0254789632','Company name of role',NULL,NULL,'/assets/img/1741166152340-404064070.jpg','2025-03-05 09:15:52',0,'2025-03-05 09:15:52',2),(19,'Test User','testuser1741174018839@example.com','$argon2id$v=19$m=65536,t=3,p=4$SPp8fmk0fXzPH1QgsYcTeg$b6pKpyfBiz0QpjLJBng4tKxAF9YwltlQaWkvMHipSho','0123456789','Test Company',NULL,NULL,'/assets/img/1741174018916-299412911.jpg','2025-03-05 11:26:59',0,'2025-03-05 11:26:59',2),(20,'Test User','testuser1741175502324@example.com','$argon2id$v=19$m=65536,t=3,p=4$p/nCdt2K+1x//PYuuTfXNA$ZrgHHM6vKVK0ZnlUcrQpjMh7HXF4gJLTZX0XbFXu2gk','0123456789','Test Company',NULL,NULL,'/assets/img/1741175502392-141655035.jpg','2025-03-05 11:51:42',0,'2025-03-05 11:51:42',2),(21,'Test User','testuser1741175944312@example.com','$argon2id$v=19$m=65536,t=3,p=4$Syc4faTdazJcbT8UAZmddw$ZnsXVbQqEwzObLB/Ql00wRme1lnRWXf07i07DIsvVMA','0123456789','Test Company',NULL,NULL,'/assets/img/1741175944378-345040020.jpg','2025-03-05 11:59:04',0,'2025-03-05 11:59:04',2),(22,'Test User','testuser1741175974958@example.com','$argon2id$v=19$m=65536,t=3,p=4$7lSYvdH5+XOJes+MUYbRyg$ypRulxgviVSGU7DrHJ3+EsDEF48b9Ncs1JRLqclKhQ0','0123456789','Test Company',NULL,NULL,'/assets/img/1741175975025-611263002.jpg','2025-03-05 11:59:35',0,'2025-03-05 11:59:35',2),(23,'Test User','testuser1741176009451@example.com','$argon2id$v=19$m=65536,t=3,p=4$okb2MRQpCZEijM2kjU/atA$UjkLtz5IhZti3ypCzcmWOpDJwCNvc4ZAYk34MS23v44','0123456789','Test Company',NULL,NULL,'/assets/img/1741176009529-456456253.jpg','2025-03-05 12:00:09',0,'2025-03-05 12:00:09',2),(24,'Test User','testuser1741176074836@example.com','$argon2id$v=19$m=65536,t=3,p=4$wGbsM64weHw9HPKhbguX8g$hKK6WT2f2qyOZ9GlQZzPkUarbSLuF4ggg8lVQ4t5Qc0','0123456789','Test Company',NULL,NULL,'/assets/img/1741176074915-223956774.jpg','2025-03-05 12:01:15',0,'2025-03-05 12:01:15',2),(25,'Test User','testuser1741176229139@example.com','$argon2id$v=19$m=65536,t=3,p=4$gPsYTsp1GC7+nOpYUTOTMg$0vRRhg4M2ZWT3PEdsA4ThXUFQHNPvo4kpfrYC3UA9FM','0123456789','Test Company',NULL,NULL,'/assets/img/1741176229212-525685943.jpg','2025-03-05 12:03:49',0,'2025-03-05 12:03:49',2),(26,'Test User','testuser1741176554119@example.com','$argon2id$v=19$m=65536,t=3,p=4$+zxVJIAf882Kq6TS3WqzWA$I0TRODeS+KssqQjBfROpPGRbMBPxX9xKcrnBB9SL1zA','0123456789','Test Company',NULL,NULL,'/assets/img/1741176554195-365704505.jpg','2025-03-05 12:09:14',0,'2025-03-05 12:09:14',2),(27,'Test User','testuser1741177101311@example.com','$argon2id$v=19$m=65536,t=3,p=4$Pd9HKweObrQ4sQyY+Ygy5A$Tcudh133vA5+9DUNOMPzQDeuPJQmq00ItbBmbyky1G8','0123456789','Test Company',NULL,NULL,'/assets/img/1741177101368-70522604.jpg','2025-03-05 12:18:21',0,'2025-03-05 12:18:21',2),(28,'Test User','testuser1741178279623@example.com','$argon2id$v=19$m=65536,t=3,p=4$KfgP30fhuV17TYlOKdoTJw$x1XZev1RtyENzMtUXjK59/5ewa9fvSapCnOvZfrh7Bc','0123456789','Test Company',NULL,NULL,'/assets/img/1741178279713-951276554.jpg','2025-03-05 12:37:59',0,'2025-03-05 12:37:59',2),(29,'Test User','testuser1741178336892@example.com','$argon2id$v=19$m=65536,t=3,p=4$E2b/Cb/9hNDzLMPvIZFZtA$RCHNGt41uCVjM9BpoQa85FTvGeQfnKxMIIpS+i8amco','0123456789','Test Company',NULL,NULL,'/assets/img/1741178336978-376625077.jpg','2025-03-05 12:38:57',0,'2025-03-05 12:38:57',2),(30,'Test User','testuser1741178649901@example.com','$argon2id$v=19$m=65536,t=3,p=4$xDektCB1xf26J8tYZZH9iA$EjhPmqbylRmEOdo7eLCYAoPWy5JmD0zswOSS0xWnpMk','0123456789','Test Company',NULL,NULL,'/assets/img/1741178649997-207023317.jpg','2025-03-05 12:44:10',0,'2025-03-05 12:44:10',2),(31,'Test User','testuser1741178733611@example.com','$argon2id$v=19$m=65536,t=3,p=4$EHY0+btfBhyFhvxB+wTfog$OBdKyw4w8FEXcZtV6MN4ZxDuLgFqn9hhpPurbBxiMgc','0123456789','Test Company',NULL,NULL,'/assets/img/1741178733703-244218079.jpg','2025-03-05 12:45:33',0,'2025-03-05 12:45:33',2),(32,'Test User','testuser1741178818585@example.com','$argon2id$v=19$m=65536,t=3,p=4$wgxuFVyDBuA0P4Z85qbsiQ$4oNq2o9T6h2q5/Th9A/Mp3shX40CWfqkSTMNHBdoIC8','0123456789','Test Company',NULL,NULL,'/assets/img/1741178818674-215388716.jpg','2025-03-05 12:46:58',0,'2025-03-05 12:46:58',2),(33,'Test User','testuser1741178922484@example.com','$argon2id$v=19$m=65536,t=3,p=4$tsvwA/ZLHEAVvAZp6A6JIA$KvmpnIRu3YrmyhbxcI3CbJ2iHCTlGGgZAE7hYredgA4','0123456789','Test Company',NULL,NULL,'/assets/img/1741178922568-329109962.jpg','2025-03-05 12:48:42',0,'2025-03-05 12:48:42',2),(34,'Test User','testuser1741178964379@example.com','$argon2id$v=19$m=65536,t=3,p=4$SgN3eN5OgO3vgT7bdz2z3g$WaOtASDJsDijSX2tQo2C3fEMPYDFspo3BJE+vc34Pcc','0123456789','Test Company',NULL,NULL,'/assets/img/1741178964471-259252392.jpg','2025-03-05 12:49:24',0,'2025-03-05 12:49:24',2),(35,'Test User','testuser1741179046115@example.com','$argon2id$v=19$m=65536,t=3,p=4$+sLZ5J33BnSwFlTHV4rHIQ$vxcjGg9AsH3J/PV2twlcKzh3TIf+pgrPqIe2BIctknA','0123456789','Test Company',NULL,NULL,'/assets/img/1741179046174-647737513.jpg','2025-03-05 12:50:46',0,'2025-03-05 12:50:46',2),(36,'Test User','testuser1741179081753@example.com','$argon2id$v=19$m=65536,t=3,p=4$vhiUh1RrnaYFudXCfuIC2g$sar9J/tFxuX16wE4udHgomSYGjVKpKBjoa0E9KVdCUQ','0123456789','Test Company',NULL,NULL,'/assets/img/1741179081810-423697616.jpg','2025-03-05 12:51:21',0,'2025-03-05 12:51:21',2),(37,'Test User','testuser1741179131724@example.com','$argon2id$v=19$m=65536,t=3,p=4$qsKG7rHxoYBJdmGokCvT6g$bNFRy30NByHPbXt9wguye1JSHuTwYDzU6f3k0F78+oA','0123456789','Test Company',NULL,NULL,'/assets/img/1741179131791-462360554.jpg','2025-03-05 12:52:11',0,'2025-03-05 12:52:11',2),(38,'Test User','testuser1741179435472@example.com','$argon2id$v=19$m=65536,t=3,p=4$ogMKQ04EWxVa9SQ53D4i9A$MeOvRJ2b22L1/EqknZVdcmFQ+8wNZ5biIyYf5L7u9yQ','0123456789','Test Company',NULL,NULL,'/assets/img/1741179435550-771292457.jpg','2025-03-05 12:57:15',0,'2025-03-05 12:57:15',2),(42,'Test User','testuser1741270317904@example.com','$argon2id$v=19$m=65536,t=3,p=4$7R4Qbc3+Lj6y61bYWbcR9w$UyyLW/WL13YE5GmuU7B2CU+hghtG14qlhchb8LwR4Rs','0123456789','Test Company',NULL,NULL,'/assets/img/1741270317988-943242646.jpg','2025-03-06 14:11:58',0,'2025-03-06 14:11:58',2),(43,'Test User','testuser1741270383990@example.com','$argon2id$v=19$m=65536,t=3,p=4$AVjwosoOVTGxntVW3rIdig$E8L/gJEsx7EREsz/o2MnZsHm5MewvIjZ2SSuIpMiFZU','0123456789','Test Company',NULL,NULL,'/assets/img/1741270384073-487377861.jpg','2025-03-06 14:13:04',0,'2025-03-06 14:13:04',2),(44,'Test User','testuser1741682198477@example.com','$argon2id$v=19$m=65536,t=4,p=2$vRMmqHrxYvCjyz9Qt03abA$aqSHGL4hJr3eO1hRLecWGBn3cFKHpsFzZ3m6kGokvhc','0123456789','Test Company',NULL,NULL,'/assets/img/1741682198555-459684452.jpg','2025-03-11 08:36:38',0,'2025-03-11 08:36:38',2),(45,'Test User','testuser1741682272634@example.com','$argon2id$v=19$m=65536,t=4,p=2$725KBh2Ne+fcdOhs01NTHw$7OfpNofmlrrjTY4eUoj19BdZMq8ova1jH2vE0+jTmjE','0123456789','Test Company',NULL,NULL,'/assets/img/1741682272698-319763249.jpg','2025-03-11 08:37:52',0,'2025-03-11 08:37:52',2),(46,'Test User','testuser1741682336024@example.com','$argon2id$v=19$m=65536,t=4,p=2$cnDZEp5D4PlWCjLeRQRrdQ$iQ9R7qo1BkMp3XJ6CPcxgfVuSre+4t/liWKNZnknkMs','0123456789','Test Company',NULL,NULL,'/assets/img/1741682336088-603001371.jpg','2025-03-11 08:38:56',0,'2025-03-11 08:38:56',2),(47,'Test User','testuser1741682351038@example.com','$argon2id$v=19$m=65536,t=4,p=2$3Wu+vlkEkeft3wDt3mOZeQ$GjPusSK0E+8c+I7p7r/cTic3ShgqZ5xhfvynWXvBKMQ','0123456789','Test Company',NULL,NULL,'/assets/img/1741682351114-995913850.jpg','2025-03-11 08:39:11',0,'2025-03-11 08:39:11',2),(48,'Test User','testuser1741682388009@example.com','$argon2id$v=19$m=65536,t=4,p=2$StOJyQkpTU0SjcOETLZLDw$+F0HUHqAVuZEaF8evFqi9XL69kxRS3FQZlDZI/d+zsE','0123456789','Test Company',NULL,NULL,'/assets/img/1741682388077-136637595.jpg','2025-03-11 08:39:48',0,'2025-03-11 08:39:48',2),(83,'Test User','testuser1745570137735@example.com','$argon2id$v=19$m=65536,t=4,p=2$lp8ZpfRNiP2omMqaVH6FMA$NOQYuqHAUHuq4DbPBDJwMM0hVl8/IKkhsj8wPeYTf40','0123456789','Test Company',NULL,NULL,'/assets/img/1745570137749-42512003.jpg','2025-04-25 08:35:37',0,'2025-04-25 08:35:37',2),(85,'Test User','testuser1745570174335@example.com','$argon2id$v=19$m=65536,t=4,p=2$+Ms9w3nfCnEGO1/CcKT8uw$xYzfVBlXqLoo6NbXWJpkZ+sBckm3aKfuuU+Y9IyD/bU','0123456789','Test Company',NULL,NULL,'/assets/img/1745570174368-617801298.jpg','2025-04-25 08:36:14',0,'2025-04-25 08:36:14',2);
/*!40000 ALTER TABLE `userpro` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-25 15:44:34
