-- MySQL dump 10.13  Distrib 5.7.34, for Linux (x86_64)
--
-- Host: localhost    Database: db_main
-- ------------------------------------------------------
-- Server version	5.7.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20210228172003-create-user.js'),('20210228173048-create-role.js'),('20210228173633-create-user-roles.js'),('20210228191308-add_email_and_phone_to_user_table.js'),('20210413074654-add_fullname_and_token_for_register_to_user_table.js'),('20210413081451-create_table_film.js'),('20210413083335-create_table_director.js'),('20210413083948-create_table_film_type.js'),('20210413084055-create_table_actors.js'),('20210413084419-create_table_films_has_film_types.js'),('20210413084634-create_table_films_has_actors.js'),('20210413085641-create_table_cinema.js'),('20210413090607-create_table_rooms.js'),('20210413091607-create_table_sessions.js'),('20210413100719-create_table_bookings.js'),('20210413102547-create_table_food_drinks.js'),('20210414052400-create_table_bookings_has_food_drinks.js'),('20210425125714-add_sub_name_in_table_film.js'),('20210502163326-add_duration_column_to_film_table.js'),('20210502163649-add_cinema_id_to_session_table_for_1-n_relationship.js'),('20210503113918-add_count_colum_to_booking_has_fooddrink_table.js'),('20210503114637-add_checkedOutAt_column_to_bookings_table.js'),('20210508085952-alter_column_booked_seats_and_empty_seat_in_session_table.js'),('20210515205902-alter_column_director_id_at_film_table.js'),('20210517185851-alter_column_column_at_table_room.js'),('20210605213429-add_column_is_close_to_table_booking.js'),('20210613082734-create-index-for-table-films.js'),('20210613091749-create-index-for-table-bookings.js'),('20210613092231-create-index-for-table-users.js'),('20210613092613-create-index-for-table-actors-and-directors.js'),('20210617180332-create-table-user-rating-film.js'),('20210821084638-create-table-promotion.js'),('20210821094534-alter_column_content_in_table_promotion.js'),('20210821104417-create_table_promotion_subcriptions.js'),('20210821152019-add_column_name_into_promotions_table.js'),('20220626155510-create-table-booking-payment.js'),('20220629152933-create_table_save_refund_status.js'),('20220701023052-add_column_status_for_table_booking_payments.js'),('20220705195321-increase_size_of_role_name.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `actors`
--

DROP TABLE IF EXISTS `actors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `actors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `date_of_birth` date NOT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `images` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nation` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `actors_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actors`
--

LOCK TABLES `actors` WRITE;
/*!40000 ALTER TABLE `actors` DISABLE KEYS */;
INSERT INTO `actors` VALUES (1,'Vũ Ngọc Đăng','1974-01-01','Được đánh giá là một trong số đạo diễn trẻ có độ “hot” nhất định với công chúng, Vũ Ngọc Đãng luôn khiến khán giả phải quan tâm đến các “sản phẩm” của mình. Giải thưởng Đạo diễn xuất sắc nhất dành cho bộ phim Hotboy nổi loạn và câu chuyện về thằng Cười, cô gái điếm và con vịt trong Liên hoan phim VN lần thứ 17 vừa qua tại Phú Yên là phần thưởng xứng đáng dành cho những thể nghiệm đầy tính sáng tạo của anh.','','Việt Nam','2021-04-25 17:14:00','2021-04-25 17:14:00'),(2,'Lý Hải','1969-09-28','','','Việt Nam','2021-04-25 17:14:00','2021-04-25 17:14:00'),(3,'Nagaoka Chika','1970-01-01','','','Nhật Bản','2021-04-25 17:14:00','2021-04-25 17:14:00'),(4,'Joe Carnahan','1970-01-01','','','Mỹ','2021-04-25 17:14:00','2021-04-25 17:14:00'),(5,'Choi Jae Hoon','1970-01-01','','','Hàn Quốc','2021-04-25 17:14:00','2021-04-25 17:14:00'),(6,'Studio 100 Media','1970-01-01','','','','2021-04-25 17:14:00','2021-04-25 17:14:00'),(7,'Simon McQuoid','1970-01-01','','','Mỹ','2021-04-25 17:14:00','2021-04-25 17:14:00'),(8,'Lee Yong Joo','1970-01-01','','','Hàn Quốc','2021-04-25 17:14:00','2021-04-25 17:14:00');
/*!40000 ALTER TABLE `actors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_payments`
--

DROP TABLE IF EXISTS `booking_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `booking_payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) NOT NULL,
  `payment_payload` text COLLATE utf8_unicode_ci,
  `status` char(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`booking_id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_payments`
--

LOCK TABLES `booking_payments` WRITE;
/*!40000 ALTER TABLE `booking_payments` DISABLE KEYS */;
INSERT INTO `booking_payments` VALUES (3,2,NULL,'O','2022-07-01 14:54:35','2022-07-01 14:54:35'),(4,2,'{\"vnp_Amount\":\"10000000\",\"vnp_BankCode\":\"NCB\",\"vnp_BankTranNo\":\"VNP13786984\",\"vnp_CardType\":\"ATM\",\"vnp_PayDate\":\"20220701145455\",\"vnp_OrderInfo\":\"pay\",\"vnp_TransactionNo\":\"13786984\",\"vnp_ResponseCode\":\"00\",\"vnp_TxnRef\":\"2_145440\"}','P','2022-07-01 14:55:01','2022-07-01 14:55:01'),(5,2,NULL,'R','2022-07-01 21:20:43','2022-07-01 21:20:43'),(6,2,NULL,'S','2022-07-01 21:20:43','2022-07-01 21:20:43'),(7,3,NULL,'O','2022-07-01 21:41:26','2022-07-01 21:41:26'),(8,3,'{\"vnp_Amount\":\"15500000\",\"vnp_BankCode\":\"NCB\",\"vnp_BankTranNo\":\"VNP13787213\",\"vnp_CardType\":\"ATM\",\"vnp_PayDate\":\"20220701214139\",\"vnp_OrderInfo\":\"pay\",\"vnp_TransactionNo\":\"13787213\",\"vnp_ResponseCode\":\"00\",\"vnp_TxnRef\":\"3_214128\"}','P','2022-07-01 21:41:43','2022-07-01 21:41:43'),(9,3,NULL,'R','2022-07-01 21:41:55','2022-07-01 21:41:55'),(16,3,NULL,'S','2022-07-01 21:50:43','2022-07-01 21:50:43'),(17,3,NULL,'S','2022-07-01 21:52:27','2022-07-01 21:52:27'),(18,4,NULL,'O','2022-07-01 21:58:02','2022-07-01 21:58:02'),(19,4,'{\"vnp_Amount\":\"30500000\",\"vnp_BankCode\":\"NCB\",\"vnp_BankTranNo\":\"VNP13787218\",\"vnp_CardType\":\"ATM\",\"vnp_PayDate\":\"20220701215817\",\"vnp_OrderInfo\":\"pay\",\"vnp_TransactionNo\":\"13787218\",\"vnp_ResponseCode\":\"00\",\"vnp_TxnRef\":\"4_215808\"}','P','2022-07-01 21:58:22','2022-07-01 21:58:22'),(20,5,NULL,'O','2022-07-01 21:59:01','2022-07-01 21:59:01'),(21,4,NULL,'R','2022-07-01 21:59:36','2022-07-01 21:59:36'),(22,4,'false','S','2022-07-01 22:00:29','2022-07-01 22:00:29'),(23,6,NULL,'O','2022-07-01 22:16:11','2022-07-01 22:16:11'),(24,6,'{\"vnp_Amount\":\"10000000\",\"vnp_BankCode\":\"NCB\",\"vnp_BankTranNo\":\"VNP13787227\",\"vnp_CardType\":\"ATM\",\"vnp_PayDate\":\"20220701221623\",\"vnp_OrderInfo\":\"pay\",\"vnp_TransactionNo\":\"13787227\",\"vnp_ResponseCode\":\"00\",\"vnp_TxnRef\":\"6_221613\"}','P','2022-07-01 22:16:27','2022-07-01 22:16:27'),(25,7,NULL,'O','2022-07-01 22:16:48','2022-07-01 22:16:48'),(26,6,NULL,'R','2022-07-01 22:19:01','2022-07-01 22:19:01'),(27,6,'false','S','2022-07-01 22:19:10','2022-07-01 22:19:10'),(28,8,NULL,'O','2022-07-01 22:26:30','2022-07-01 22:26:30'),(29,8,'{\"vnp_Amount\":\"10000000\",\"vnp_BankCode\":\"NCB\",\"vnp_BankTranNo\":\"VNP13787233\",\"vnp_CardType\":\"ATM\",\"vnp_PayDate\":\"20220701222650\",\"vnp_OrderInfo\":\"pay\",\"vnp_TransactionNo\":\"13787233\",\"vnp_ResponseCode\":\"00\",\"vnp_TxnRef\":\"8_222640\"}','P','2022-07-01 22:26:55','2022-07-01 22:26:55'),(30,8,NULL,'R','2022-07-01 22:27:25','2022-07-01 22:27:25'),(31,9,NULL,'O','2022-07-01 22:33:01','2022-07-01 22:33:01'),(32,9,'{\"vnp_Amount\":\"10000000\",\"vnp_BankCode\":\"NCB\",\"vnp_BankTranNo\":\"VNP13787240\",\"vnp_CardType\":\"ATM\",\"vnp_PayDate\":\"20220701223311\",\"vnp_OrderInfo\":\"pay\",\"vnp_TransactionNo\":\"13787240\",\"vnp_ResponseCode\":\"00\",\"vnp_TxnRef\":\"9_223302\"}','P','2022-07-01 22:33:16','2022-07-01 22:33:16'),(33,9,NULL,'R','2022-07-01 22:33:28','2022-07-01 22:33:28'),(34,10,NULL,'O','2022-07-01 22:37:36','2022-07-01 22:37:36'),(35,10,'{\"vnp_Amount\":\"10000000\",\"vnp_BankCode\":\"NCB\",\"vnp_BankTranNo\":\"VNP13787245\",\"vnp_CardType\":\"ATM\",\"vnp_PayDate\":\"20220701223747\",\"vnp_OrderInfo\":\"pay\",\"vnp_TransactionNo\":\"13787245\",\"vnp_ResponseCode\":\"00\",\"vnp_TxnRef\":\"10_223738\"}','P','2022-07-01 22:37:51','2022-07-01 22:37:51'),(36,10,NULL,'R','2022-07-01 22:38:00','2022-07-01 22:38:00'),(37,10,'{\"vnp_Amount\":\"10000000\",\"vnp_BankCode\":\"NCB\",\"vnp_Message\":\"SUCCESS\",\"vnp_OrderInfo\":\"refund\",\"vnp_PayDate\":\"20220701223810\",\"vnp_ResponseCode\":\"00\",\"vnp_TmnCode\":\"D9OT7CQ1\",\"vnp_TransactionNo\":\"13787246\",\"vnp_TransactionStatus\":\"05\",\"vnp_TransactionType\":\"02\",\"vnp_TxnRef\":\"10_223738\",\"vnp_SecureHash\":\"819278151d6ffa75125a8ea718daecc574ebdcef1779733ba1bd354d832de8d6\"}','S','2022-07-01 22:38:10','2022-07-01 22:38:10'),(38,11,NULL,'O','2022-07-03 00:08:36','2022-07-03 00:08:36'),(39,11,'{\"vnp_Amount\":\"10000000\",\"vnp_BankCode\":\"NCB\",\"vnp_BankTranNo\":\"VNP13787622\",\"vnp_CardType\":\"ATM\",\"vnp_PayDate\":\"20220703000846\",\"vnp_OrderInfo\":\"pay\",\"vnp_TransactionNo\":\"13787622\",\"vnp_ResponseCode\":\"00\",\"vnp_TxnRef\":\"11_000837\"}','P','2022-07-03 00:08:49','2022-07-03 00:08:49'),(62,11,NULL,'R','2022-07-03 02:25:08','2022-07-03 02:25:08'),(63,11,'{\"vnp_Amount\":\"10000000\",\"vnp_BankCode\":\"NCB\",\"vnp_Message\":\"SUCCESS\",\"vnp_OrderInfo\":\"refund\",\"vnp_PayDate\":\"20220703022527\",\"vnp_ResponseCode\":\"00\",\"vnp_TmnCode\":\"D9OT7CQ1\",\"vnp_TransactionNo\":\"13787631\",\"vnp_TransactionStatus\":\"05\",\"vnp_TransactionType\":\"02\",\"vnp_TxnRef\":\"11_000837\",\"vnp_SecureHash\":\"bc6c19f62f22591f8b27aee4196cb31ded9924051b519ee93273f3c65e9d8316\"}','S','2022-07-03 02:25:27','2022-07-03 02:25:27'),(64,12,NULL,'O','2022-07-03 02:34:47','2022-07-03 02:34:47'),(65,12,'{\"vnp_Amount\":\"10000000\",\"vnp_BankCode\":\"NCB\",\"vnp_BankTranNo\":\"VNP13787633\",\"vnp_CardType\":\"ATM\",\"vnp_PayDate\":\"20220703023500\",\"vnp_OrderInfo\":\"pay\",\"vnp_TransactionNo\":\"13787633\",\"vnp_ResponseCode\":\"00\",\"vnp_TxnRef\":\"12_023448\"}','P','2022-07-03 02:35:04','2022-07-03 02:35:04'),(66,12,NULL,'R','2022-07-03 02:35:34','2022-07-03 02:35:34'),(67,13,NULL,'O','2022-07-03 02:43:32','2022-07-03 02:43:32'),(68,13,'{\"vnp_Amount\":\"10000000\",\"vnp_BankCode\":\"NCB\",\"vnp_BankTranNo\":\"VNP13787634\",\"vnp_CardType\":\"ATM\",\"vnp_PayDate\":\"20220703024357\",\"vnp_OrderInfo\":\"pay\",\"vnp_TransactionNo\":\"13787634\",\"vnp_ResponseCode\":\"00\",\"vnp_TxnRef\":\"13_024347\"}','P','2022-07-03 02:44:01','2022-07-03 02:44:01'),(69,14,NULL,'O','2022-07-03 03:02:00','2022-07-03 03:02:00'),(70,14,NULL,'O','2022-07-06 02:16:45','2022-07-06 02:16:45'),(71,14,'{\"vnp_Amount\":\"22500000\",\"vnp_BankCode\":\"NCB\",\"vnp_BankTranNo\":\"VNP13789640\",\"vnp_CardType\":\"ATM\",\"vnp_PayDate\":\"20220706021656\",\"vnp_OrderInfo\":\"pay\",\"vnp_TransactionNo\":\"13789640\",\"vnp_ResponseCode\":\"00\",\"vnp_TxnRef\":\"14_021646\"}','P','2022-07-06 02:17:00','2022-07-06 02:17:00'),(72,15,NULL,'O','2022-07-06 22:29:09','2022-07-06 22:29:09'),(73,15,'{\"vnp_Amount\":\"15000000\",\"vnp_BankCode\":\"NCB\",\"vnp_BankTranNo\":\"VNP13790674\",\"vnp_CardType\":\"ATM\",\"vnp_PayDate\":\"20220706222926\",\"vnp_OrderInfo\":\"pay\",\"vnp_TransactionNo\":\"13790674\",\"vnp_ResponseCode\":\"00\",\"vnp_TxnRef\":\"15_222910\"}','P','2022-07-06 22:29:29','2022-07-06 22:29:29'),(74,16,NULL,'O','2022-07-18 20:55:50','2022-07-18 20:55:50'),(75,16,'{\"vnp_Amount\":\"12000000\",\"vnp_BankCode\":\"NCB\",\"vnp_BankTranNo\":\"VNP13798968\",\"vnp_CardType\":\"ATM\",\"vnp_PayDate\":\"20220718205605\",\"vnp_OrderInfo\":\"pay\",\"vnp_TransactionNo\":\"13798968\",\"vnp_ResponseCode\":\"00\",\"vnp_TxnRef\":\"16_205551\"}','P','2022-07-18 20:56:10','2022-07-18 20:56:10'),(76,17,NULL,'O','2022-07-18 21:02:44','2022-07-18 21:02:44'),(77,17,'{\"vnp_Amount\":\"7500000\",\"vnp_BankCode\":\"NCB\",\"vnp_BankTranNo\":\"VNP13798970\",\"vnp_CardType\":\"ATM\",\"vnp_PayDate\":\"20220718210255\",\"vnp_OrderInfo\":\"pay\",\"vnp_TransactionNo\":\"13798970\",\"vnp_ResponseCode\":\"00\",\"vnp_TxnRef\":\"17_210246\"}','P','2022-07-18 21:02:59','2022-07-18 21:02:59'),(78,18,NULL,'O','2022-07-18 21:04:20','2022-07-18 21:04:20'),(79,19,NULL,'O','2022-07-18 21:06:45','2022-07-18 21:06:45'),(80,19,'{\"vnp_Amount\":\"8000000\",\"vnp_BankCode\":\"NCB\",\"vnp_BankTranNo\":\"VNP13798973\",\"vnp_CardType\":\"ATM\",\"vnp_PayDate\":\"20220718210707\",\"vnp_OrderInfo\":\"pay\",\"vnp_TransactionNo\":\"13798973\",\"vnp_ResponseCode\":\"00\",\"vnp_TxnRef\":\"19_210656\"}','P','2022-07-18 21:07:11','2022-07-18 21:07:11'),(81,19,NULL,'R','2022-07-18 21:07:27','2022-07-18 21:07:27'),(82,19,'{\"vnp_Amount\":\"8000000\",\"vnp_BankCode\":\"NCB\",\"vnp_Message\":\"SUCCESS\",\"vnp_OrderInfo\":\"refund\",\"vnp_PayDate\":\"20220718210747\",\"vnp_ResponseCode\":\"00\",\"vnp_TmnCode\":\"D9OT7CQ1\",\"vnp_TransactionNo\":\"13798974\",\"vnp_TransactionStatus\":\"05\",\"vnp_TransactionType\":\"02\",\"vnp_TxnRef\":\"19_210656\",\"vnp_SecureHash\":\"de133b38e15f76893f2346f1afb6fbe9f0c76d3fa2871125aea5878bea06b9ed\"}','S','2022-07-18 21:07:46','2022-07-18 21:07:46'),(83,20,NULL,'O','2022-07-19 09:01:11','2022-07-19 09:01:11'),(84,20,'{\"vnp_Amount\":\"22000000\",\"vnp_BankCode\":\"NCB\",\"vnp_BankTranNo\":\"VNP13799094\",\"vnp_CardType\":\"ATM\",\"vnp_PayDate\":\"20220719090147\",\"vnp_OrderInfo\":\"pay\",\"vnp_TransactionNo\":\"13799094\",\"vnp_ResponseCode\":\"00\",\"vnp_TxnRef\":\"20_090117\"}','P','2022-07-19 09:01:58','2022-07-19 09:01:58');
/*!40000 ALTER TABLE `booking_payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_time` datetime NOT NULL,
  `keeping_time` datetime NOT NULL,
  `fee` int(11) NOT NULL,
  `seats` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `session_id` int(11) NOT NULL,
  `session_room_id` int(11) NOT NULL,
  `qr_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `checked_out_at` datetime DEFAULT NULL,
  `is_close` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `bookings_user_id` (`user_id`),
  KEY `bookings_session_id` (`session_id`),
  KEY `bookings_checked_out_at` (`checked_out_at`),
  KEY `bookings_is_close` (`is_close`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (2,'2022-07-01 02:54:35','2022-07-01 03:09:35',100000,'J-5',7,2,1,NULL,'2022-07-01 14:54:35','2022-07-06 04:27:08','2022-07-01 14:54:55',0),(3,'2022-07-01 09:41:26','2022-07-01 09:56:26',155000,'J-5',7,3,2,NULL,'2022-07-01 21:41:26','2022-07-01 21:41:43','2022-07-01 21:41:39',0),(4,'2022-07-01 09:57:52','2022-07-01 10:12:52',305000,'J-10,J-11',7,3,2,NULL,'2022-07-01 21:57:53','2022-07-01 21:58:22','2022-07-01 21:58:17',0),(6,'2022-07-01 10:16:11','2022-07-01 10:31:11',100000,'J-6',7,3,2,NULL,'2022-07-01 22:16:11','2022-07-01 22:16:27','2022-07-01 22:16:23',0),(8,'2022-07-01 10:26:29','2022-07-01 10:41:29',100000,'J-9',7,3,2,NULL,'2022-07-01 22:26:29','2022-07-01 22:26:55','2022-07-01 22:26:50',0),(9,'2022-07-01 10:33:01','2022-07-01 10:48:01',100000,'J-8',7,3,2,NULL,'2022-07-01 22:33:01','2022-07-01 22:33:16','2022-07-01 22:33:11',0),(10,'2022-07-01 10:37:36','2022-07-01 10:52:36',100000,'J-10',7,3,2,NULL,'2022-07-01 22:37:36','2022-07-01 22:37:51','2022-07-01 22:37:47',0),(11,'2022-07-03 12:08:36','2022-07-03 12:23:36',100000,'J-11',7,4,1,NULL,'2022-07-03 00:08:36','2022-07-03 00:08:49','2022-07-03 00:08:46',0),(12,'2022-07-03 02:34:46','2022-07-03 02:49:46',100000,'J-11',7,4,1,NULL,'2022-07-03 02:34:47','2022-07-03 02:35:04','2022-07-03 02:35:00',0),(13,'2022-07-03 02:43:32','2022-07-03 02:58:32',100000,'J-10',7,4,1,NULL,'2022-07-03 02:43:32','2022-07-03 02:44:01','2022-07-03 02:43:57',0),(14,'2022-07-06 02:16:44','2022-07-06 02:31:44',225000,'N-7',7,6,13,NULL,'2022-07-06 02:16:45','2022-07-06 04:12:34','2022-07-06 02:16:56',1),(15,'2022-07-06 10:29:08','2022-07-06 10:44:08',150000,'N-8',7,6,13,NULL,'2022-07-06 22:29:09','2022-07-06 22:29:29','2022-07-06 22:29:26',0),(16,'2022-07-18 08:55:49','2022-07-18 09:10:49',120000,'J-5',7,7,7,NULL,'2022-07-18 20:55:49','2022-07-18 20:56:09','2022-07-18 20:56:05',0),(17,'2022-07-18 09:02:44','2022-07-18 09:17:44',75000,'J-6',7,8,2,NULL,'2022-07-18 21:02:44','2022-07-18 21:02:59','2022-07-18 21:02:55',0),(19,'2022-07-18 09:06:44','2022-07-18 09:21:44',80000,'N-14',7,9,13,NULL,'2022-07-18 21:06:45','2022-07-18 21:08:28','2022-07-18 21:07:07',0),(20,'2022-07-19 09:01:10','2022-07-19 09:16:10',220000,'F-5,F-6',10,8,2,NULL,'2022-07-19 09:01:10','2022-07-19 09:03:32','2022-07-19 09:01:47',1);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings_has_food_drinks`
--

DROP TABLE IF EXISTS `bookings_has_food_drinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookings_has_food_drinks` (
  `booking_id` int(11) NOT NULL,
  `booking_user_id` int(11) NOT NULL,
  `food_drink_id` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  PRIMARY KEY (`booking_id`,`booking_user_id`,`food_drink_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings_has_food_drinks`
--

LOCK TABLES `bookings_has_food_drinks` WRITE;
/*!40000 ALTER TABLE `bookings_has_food_drinks` DISABLE KEYS */;
INSERT INTO `bookings_has_food_drinks` VALUES (2,7,1,1),(3,7,1,1),(3,7,5,1),(4,7,1,1),(4,7,2,1),(4,7,4,1),(4,7,5,1),(14,7,1,1),(14,7,2,1),(16,7,1,1),(20,10,1,1),(20,10,4,1),(20,10,5,1);
/*!40000 ALTER TABLE `bookings_has_food_drinks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cinemas`
--

DROP TABLE IF EXISTS `cinemas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cinemas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cinemas`
--

LOCK TABLES `cinemas` WRITE;
/*!40000 ALTER TABLE `cinemas` DISABLE KEYS */;
INSERT INTO `cinemas` VALUES (1,'Mặt trời','Đà Nẵng','2021-04-25 17:14:00','2021-04-25 17:14:00'),(2,'Trái Đất','Hà Nội','2021-04-25 17:14:00','2021-04-25 17:14:00');
/*!40000 ALTER TABLE `cinemas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `directors`
--

DROP TABLE IF EXISTS `directors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `directors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `date_of_birth` date NOT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `images` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nation` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `directors_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `directors`
--

LOCK TABLES `directors` WRITE;
/*!40000 ALTER TABLE `directors` DISABLE KEYS */;
INSERT INTO `directors` VALUES (1,'Vũ Ngọc Đăng','1974-01-01','Được đánh giá là một trong số đạo diễn trẻ có độ “hot” nhất định với công chúng, Vũ Ngọc Đãng luôn khiến khán giả phải quan tâm đến các “sản phẩm” của mình. Giải thưởng Đạo diễn xuất sắc nhất dành cho bộ phim Hotboy nổi loạn và câu chuyện về thằng Cười, cô gái điếm và con vịt trong Liên hoan phim VN lần thứ 17 vừa qua tại Phú Yên là phần thưởng xứng đáng dành cho những thể nghiệm đầy tính sáng tạo của anh.','','Việt Nam','2021-04-25 17:14:00','2021-04-25 17:14:00'),(2,'Lý Hải','1969-09-28','','','Việt Nam','2021-04-25 17:14:00','2021-04-25 17:14:00'),(3,'Nagaoka Chika','1970-01-01','','','Nhật Bản','2021-04-25 17:14:00','2021-04-25 17:14:00'),(4,'Joe Carnahan','1970-01-01','','','Mỹ','2021-04-25 17:14:00','2021-04-25 17:14:00'),(5,'Choi Jae Hoon','1970-01-01','','','Hàn Quốc','2021-04-25 17:14:00','2021-04-25 17:14:00'),(6,'Studio 100 Media','1970-01-01','','','','2021-04-25 17:14:00','2021-04-25 17:14:00'),(7,'Simon McQuoid','1970-01-01','','','Mỹ','2021-04-25 17:14:00','2021-04-25 17:14:00'),(8,'Lee Yong Joo','1970-01-01','','','Hàn Quốc','2021-04-25 17:14:00','2021-04-25 17:14:00'),(9,'Adam Wingard','1970-01-01','','','Mỹ','2021-04-25 17:14:00','2021-04-25 17:14:00');
/*!40000 ALTER TABLE `directors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `film_types`
--

DROP TABLE IF EXISTS `film_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `film_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `film_types`
--

LOCK TABLES `film_types` WRITE;
/*!40000 ALTER TABLE `film_types` DISABLE KEYS */;
INSERT INTO `film_types` VALUES (1,'Hành động','2021-04-25 17:14:00','2021-04-25 17:14:00'),(2,'Hoạt hình','2021-04-25 17:14:00','2021-04-25 17:14:00'),(3,'Hài','2021-04-25 17:14:00','2021-04-25 17:14:00'),(4,'Gia đình','2021-04-25 17:14:00','2021-04-25 17:14:00'),(5,'Kinh dị','2021-04-25 17:14:00','2021-04-25 17:14:00'),(6,'Li kì','2021-04-25 17:14:00','2021-04-25 17:14:00'),(7,'Giả tưởng','2021-04-25 17:14:00','2021-04-25 17:14:00'),(8,'Hài','2021-04-25 17:14:00','2021-04-25 17:14:00');
/*!40000 ALTER TABLE `film_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `films`
--

DROP TABLE IF EXISTS `films`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `films` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `duration` int(11) DEFAULT '0',
  `sub_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `publish_date` date NOT NULL,
  `trailer` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `poster` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `nation` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `director_id` int(11) DEFAULT NULL,
  `rating` double DEFAULT '0',
  `rating_turn` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `films_name` (`name`),
  KEY `films_sub_name` (`sub_name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `films`
--

LOCK TABLES `films` WRITE;
/*!40000 ALTER TABLE `films` DISABLE KEYS */;
INSERT INTO `films` VALUES (1,'Seobok',120,'Người nhân bản','2021-04-15','https://youtu.be/URStJ9pzG-4','https://www.galaxycine.vn/media/2021/3/22/seobok-1200x1800_1616398755466.jpg','Hàn quốc','Ki Heon - một cựu nhân viên tình báo mắc chứng bệnh nan y được giao nhiệm vụ bảo vệ Seobok - người nhân bản đầu tiên trên thế giới. Bản thân Seobok mang bí mật về việc trường sinh bất tử ở con người nên đã bị truy đuổi. Liệu Ki Heon và Seobok sẽ làm cách nào để sống sót?',8,8.6,54,'2021-04-25 17:14:00','2021-04-25 17:14:00'),(2,'Mortal Kombat',120,'Cuộc chiến sinh tử','2021-04-09','https://youtu.be/Eru0ZDdfcvw','https://www.galaxycine.vn/media/2021/4/1/1200wx1800h_1617262451402.jpg','Mỹ','Võ sĩ Cole Young mang trên người vết chàm rồng đen bí ẩn - biểu tượng của Mortal Kombat. Cole chẳng hề biết về dòng máu bí ẩn của mình cũng như tại sao tên sát thủ Sub-Zero săn lùng anh. Vì bảo vệ gia đình, Cole cùng một nhóm chiến binh được tuyển chọn để tham gia một trận chiến đẫm máu.',7,8.4,142,'2021-04-25 17:14:00','2021-04-25 17:14:00'),(3,'Lật mặt: 48h',120,'Lật mặt: 48h','2021-04-14','https://youtu.be/jox0zmGyHLU','https://www.galaxycine.vn/media/2021/3/4/300-lat-mat_1614842112584.jpg','Việt Nam','Một gia đình bị truy đuổi giữa vùng sông nước. Cơ hội nào cho người đàn ông cứu lấy vợ con khỏi bọn xã hội đen máu mặt? Trong phần 5 này, đạo diễn Lý Hải đã “mạnh tay” mời đạo diễn Kim Jung Min từ Hàn Quốc sang Việt Nam làm cố vấn hành động cho đoàn phim. Được biết, Kim Jung Min cũng chính là đạo diễn hành động của phim hay ra mắt năm 2018 The Witch: Part 1. The Subversion. Theo nhận xét của giới chuyên môn, yếu tố hành động trong siêu phẩm này được đánh giá cao bởi sự độc đáo, mạnh mẽ và ác liệt. Và với sự thể hiện này, tại giải thưởng điện ảnh danh giá Rồng Xanh lần thứ 39, Kim Jung Min và Park Jung Ryul đã nhận được đề cử ở hạng mục Kỹ thuật cho phần chỉ đạo hành động xuất sắc nhất.',2,8.5,663,'2021-04-25 17:14:00','2022-07-04 12:48:39'),(4,'Detective Conan: The Scarlet Bullet',120,'Thám tử Conan: Viên đạn đỏ','2021-04-21','https://youtu.be/qZQJiyqBZHg','https://www.galaxycine.vn/media/2021/4/9/1200wx1800h_1617956777762.jpg','Nhật Bản','Hàng loạt vụ án xảy ra tại Tokyo khiến cảnh sát phải đau đầu! Ai là người đứng sau vụ án này? Tất cả sẽ được sáng tỏ nhờ tài trí của Shuichi Akai và Conan.   Lấy bối cảnh tại Tokyo, phim lấy thời gian Nhật Bản chuẩn bị để tổ chức Thế vận hội thể thao thế giới (WSG). Song song với sự kiện thể thao lớn nhất này là việc khai trương tuyến tàu điện Hyperlinear có tốc độc cực nhanh lên đến 1000km/ h.',3,9.5,180,'2021-04-25 17:14:00','2021-04-25 17:14:00'),(5,'Godzilla vs Kong',120,'Godzilla đại chiến Kong','2021-03-25','https://youtu.be/AcfvncjOGS8','https://www.galaxycine.vn/media/2021/2/26/godzilla-vs-kong-poster_1614327851876.jpg','Mỹ','Cuộc chiến được chờ đợi nhất giữa hai siêu quái thú Godzilla và King Kong cuối cùng đã đến giờ G. Con người đóng vai trò gì trong trận battle siêu kinh điển này? Kết cục của thế giới sẽ ra sao? Có kinh phí đầu tư lên đến 165 triệu USD, Godzilla vs. Kong có thể là xem “cơn địa chấn” quái vật đầu tiên trong năm 2021 đến từ Hollywood. Dân ghiền phim có thể đang rất mong chờ sự tái xuất của hai siêu quái vật nổi tiếng nhất màn ảnh, theo như những hình ảnh trong trailer có thể thấy rằng cả King Kong lẫn Godzilla sẽ có màn “giáp lá cà” tưng bừng trong phim. Đặc sản của thương hiệu “vũ trụ quái vật” chính là hiệu ứng hình ảnh kỹ xảo bậc nhất và âm thanh đỉnh cao. Hãy cùng chờ đến 26.03.2021 để tới rạp chiếu phim, chứng kiến màn đối đầu giữa Godzilla và King Kong trong Godzilla vs. Kong.',9,9,671,'2021-04-25 17:14:00','2021-04-25 17:14:00'),(6,'Bố già',120,'','2021-03-05','https://youtu.be/g8_DQqqTabk','https://www.galaxycine.vn/media/2021/2/26/300x450_1614324959732.jpg','Việt Nam','Sau thành công của web-drama, Trấn Thành đã thừa thắng xông lên, hợp tác với đạo diễn Vũ Ngọc Đãng, biên kịch Nhi Bùi để thực hiện phiên bản điện ảnh của Bố Già. Cùng với Trấn Thành, các nhân vật còn lại vẫn tiếp tục được đảm nhiệm bởi các gương mặt đã từng xuất hiện trong phiên bản đầu tiên là NSND Ngọc Giàu, Tuấn Trần, Lê Giang… Ra mắt từ đầu năm 2020, đến thời điểm này, trung bình mỗi tập phim của Bố Già đều đạt trên 20 triệu lượt xem (cao nhất là tập 1 với 33 triệu lượt xem).',1,8.2,2143,'2021-04-25 17:14:00','2021-04-25 17:14:00'),(7,'Boss Level',120,'Trùm cuối siêu đẳng','2021-04-23','https://youtu.be/EhD4I3K_cf8','https://www.galaxycine.vn/media/2021/4/20/poster-tcsd7_1618900854317.jpg','Mỹ','Bị giết chết và mắc kẹt trong vòng lặp thời gian đúng ngày hôm ấy, cựu đặc vụ Roy Pulver phát hiện manh mối về dự án bí mật của chính phủ có liên quan đến mình. Roy phải bắt người lãnh đạo Colonel Ventor để tìm ra sự thật. Liệu Roy có thể thoát khỏi vòng lặp và cứu gia đình?',9,8.4,11,'2021-04-25 17:14:00','2022-06-05 18:00:52'),(8,'THE HYPNOSIS',120,'Con lắc tà thuật','2021-04-21','https://youtu.be/kBFzWXOwGnM','https://www.galaxycine.vn/media/2021/4/19/the-hypnosis-vie_1618816865411.jpg','Hàn Quốc','Bị giết chết và mắc kẹt trong vòng lặp thời gian đúng ngày hôm ấy, cựu đặc vụ Roy Pulver phát hiện manh mối về dự án bí mật của chính phủ có liên quan đến mình. Roy phải bắt người lãnh đạo Colonel Ventor để tìm ra sự thật. Liệu Roy có thể thoát khỏi vòng lặp và cứu gia đình?',5,7.8,15,'2021-04-25 17:14:00','2021-04-25 17:14:00'),(9,'MAYA THE BEE 3: THE GOLDEN ORB',120,'Ong phiêu lưu kí 3: Giải cứu công chúa','2021-04-21','https://youtu.be/qjcNehxk67c','https://www.galaxycine.vn/media/2021/4/14/1200wx1800h_1618386528434.jpg','Đức','Vì quá háo hức chào đón mùa xuân, Maya và Willy đã thức dậy khỏi giấc ngủ đông sớm hơn dự định. Đôi bạn vô tình nhận một nhiệm vụ đặc biệt – bảo vệ và đưa quả trứng vàng đến ngôi nhà mới. Rắc rối bắt đầu khi quả trứng nứt ra và công chúa kiến bé nhỏ ra đời. Maya, Willy và những người bạn đồng hành phải phối hợp cùng nhau để chăm sóc và bảo vệ công chúa kiến khỏi vô vàn nguy hiểm xung quanh.',6,7.4,10,'2021-04-25 17:14:00','2021-04-25 17:14:00');
/*!40000 ALTER TABLE `films` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `films_has_actors`
--

DROP TABLE IF EXISTS `films_has_actors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `films_has_actors` (
  `film_id` int(11) NOT NULL,
  `actor_id` int(11) NOT NULL,
  PRIMARY KEY (`film_id`,`actor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `films_has_actors`
--

LOCK TABLES `films_has_actors` WRITE;
/*!40000 ALTER TABLE `films_has_actors` DISABLE KEYS */;
INSERT INTO `films_has_actors` VALUES (1,1),(1,2),(1,3),(1,4),(2,1),(2,5),(2,6),(2,8),(3,2),(3,3),(3,4),(4,1),(4,6),(4,7),(4,8),(5,4),(5,7),(6,1),(6,7),(6,8),(7,1),(7,2),(8,1),(8,2),(8,6),(9,4),(9,6),(9,7),(9,8);
/*!40000 ALTER TABLE `films_has_actors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `films_has_film_types`
--

DROP TABLE IF EXISTS `films_has_film_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `films_has_film_types` (
  `film_id` int(11) NOT NULL,
  `film_type_id` int(11) NOT NULL,
  PRIMARY KEY (`film_id`,`film_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `films_has_film_types`
--

LOCK TABLES `films_has_film_types` WRITE;
/*!40000 ALTER TABLE `films_has_film_types` DISABLE KEYS */;
INSERT INTO `films_has_film_types` VALUES (1,5),(1,6),(1,7),(2,1),(3,1),(4,2),(5,1),(6,3),(6,4),(7,1),(8,5),(9,2);
/*!40000 ALTER TABLE `films_has_film_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_drinks`
--

DROP TABLE IF EXISTS `food_drinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `food_drinks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_drinks`
--

LOCK TABLES `food_drinks` WRITE;
/*!40000 ALTER TABLE `food_drinks` DISABLE KEYS */;
INSERT INTO `food_drinks` VALUES (1,'Bắp thường',40000,'2021-04-25 17:14:00','2021-04-25 17:14:00'),(2,'Bắp phô mai',35000,'2021-04-25 17:14:00','2021-04-25 17:14:00'),(3,'Bắp caramen',40000,'2021-04-25 17:14:00','2021-04-25 17:14:00'),(4,'Coca',15000,'2021-04-25 17:14:00','2021-04-25 17:14:00'),(5,'Pepsi',15000,'2021-04-25 17:14:00','2021-04-25 17:14:00');
/*!40000 ALTER TABLE `food_drinks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotion_subscriptions`
--

DROP TABLE IF EXISTS `promotion_subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `promotion_subscriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion_subscriptions`
--

LOCK TABLES `promotion_subscriptions` WRITE;
/*!40000 ALTER TABLE `promotion_subscriptions` DISABLE KEYS */;
/*!40000 ALTER TABLE `promotion_subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotions`
--

DROP TABLE IF EXISTS `promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `promotions` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotions`
--

LOCK TABLES `promotions` WRITE;
/*!40000 ALTER TABLE `promotions` DISABLE KEYS */;
/*!40000 ALTER TABLE `promotions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ratings` (
  `user_id` int(11) NOT NULL,
  `film_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`film_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (1,7),(7,3);
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `permition` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `entity` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','r','user','2021-02-08 06:21:20','2021-02-08 06:21:20'),(11,'ticket-inspector','','','2021-02-08 06:21:20','2021-02-08 06:21:20'),(12,'client','','','2021-02-08 06:21:20','2021-02-08 06:21:20');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `row` int(11) NOT NULL,
  `col` int(11) NOT NULL,
  `cinema_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'RAP1',10,12,1,'2021-04-25 17:14:00','2021-04-25 17:14:00'),(2,'RAP2',10,12,1,'2021-04-25 17:14:00','2021-04-25 17:14:00'),(3,'RAP3',10,12,1,'2021-04-25 17:14:00','2021-04-25 17:14:00'),(4,'RAP4',10,12,1,'2021-04-25 17:14:00','2021-04-25 17:14:00'),(5,'RAP5',10,12,1,'2021-04-25 17:14:00','2021-04-25 17:14:00'),(6,'RAP6',10,12,1,'2021-04-25 17:14:00','2021-04-25 17:14:00'),(7,'RAP1',10,12,2,'2021-04-25 17:14:00','2021-04-25 17:14:00'),(8,'RAP2',10,12,2,'2021-04-25 17:14:00','2021-04-25 17:14:00'),(9,'RAP3',10,12,2,'2021-04-25 17:14:00','2021-04-25 17:14:00'),(10,'RAP4',10,12,2,'2021-04-25 17:14:00','2021-04-25 17:14:00'),(11,'RAP5',10,12,2,'2021-04-25 17:14:00','2021-04-25 17:14:00'),(12,'RAP6',10,12,2,'2021-04-25 17:14:00','2021-04-25 17:14:00'),(13,'RAP7',14,15,1,'2022-07-04 12:50:21','2022-07-04 12:50:21');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `cinema_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `empty_seats` text COLLATE utf8_unicode_ci,
  `booked_seats` text COLLATE utf8_unicode_ci,
  `room_id` int(11) NOT NULL,
  `film_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (2,'2022-07-01','2022-07-01 16:00:00','2022-07-01 18:00:00',1,60000,'A-0,A-1,A-2,A-3,A-4,A-5,A-6,A-7,A-8,A-9,A-10,A-11,B-0,B-1,B-2,B-3,B-4,B-5,B-6,B-7,B-8,B-9,B-10,B-11,C-0,C-1,C-2,C-3,C-4,C-5,C-6,C-7,C-8,C-9,C-10,C-11,D-0,D-1,D-2,D-3,D-4,D-5,D-6,D-7,D-8,D-9,D-10,D-11,E-0,E-1,E-2,E-3,E-4,E-5,E-6,E-7,E-8,E-9,E-10,E-11,F-0,F-1,F-2,F-3,F-4,F-5,F-6,F-7,F-8,F-9,F-10,F-11,G-0,G-1,G-2,G-3,G-4,G-5,G-6,G-7,G-8,G-9,G-10,G-11,H-0,H-1,H-2,H-3,H-4,H-5,H-6,H-7,H-8,H-9,H-10,H-11,I-0,I-1,I-2,I-3,I-4,I-5,I-6,I-7,I-8,I-9,I-10,I-11,J-0,J-1,J-2,J-3,J-4,J-6,J-7,J-8,J-9,J-10,J-11','J-5',1,3,'2022-07-01 14:52:39','2022-07-01 14:54:35'),(3,'2022-07-02','2022-07-02 12:00:00','2022-07-02 14:00:00',1,100000,'A-0,A-1,A-2,A-3,A-4,A-5,A-6,A-7,A-8,A-9,A-10,A-11,B-0,B-1,B-2,B-3,B-4,B-5,B-6,B-7,B-8,B-9,B-10,B-11,C-0,C-1,C-2,C-3,C-4,C-5,C-6,C-7,C-8,C-9,C-10,C-11,D-0,D-1,D-2,D-3,D-4,D-5,D-6,D-7,D-8,D-9,D-10,D-11,E-0,E-1,E-2,E-3,E-4,E-5,E-6,E-7,E-8,E-9,E-10,E-11,F-0,F-1,F-2,F-3,F-4,F-5,F-6,F-7,F-8,F-9,F-10,F-11,G-0,G-1,G-2,G-3,G-4,G-5,G-6,G-7,G-8,G-9,G-10,G-11,H-0,H-1,H-2,H-3,H-4,H-5,H-6,H-7,H-8,H-9,H-10,H-11,I-0,I-1,I-2,I-3,I-4,I-5,I-6,I-7,I-8,I-9,I-10,I-11,J-0,J-1,J-2,J-3,J-4,J-5,J-11,J-6,J-7,J-10','J-9,J-8',2,3,'2022-07-01 21:40:58','2022-07-01 22:38:10'),(4,'2022-07-04','2022-07-04 22:00:00','2022-07-05 00:00:00',1,100000,'A-0,A-1,A-2,A-3,A-4,A-5,A-6,A-7,A-8,A-9,A-10,A-11,B-0,B-1,B-2,B-3,B-4,B-5,B-6,B-7,B-8,B-9,B-10,B-11,C-0,C-1,C-2,C-3,C-4,C-5,C-6,C-7,C-8,C-9,C-10,C-11,D-0,D-1,D-2,D-3,D-4,D-5,D-6,D-7,D-8,D-9,D-10,D-11,E-0,E-1,E-2,E-3,E-4,E-5,E-6,E-7,E-8,E-9,E-10,E-11,F-0,F-1,F-2,F-3,F-4,F-5,F-6,F-7,F-8,F-9,F-10,F-11,G-0,G-1,G-2,G-3,G-4,G-5,G-6,G-7,G-8,G-9,G-10,G-11,H-0,H-1,H-2,H-3,H-4,H-5,H-6,H-7,H-8,H-9,H-10,H-11,I-0,I-1,I-2,I-3,I-4,I-5,I-6,I-7,I-8,I-9,I-10,I-11,J-0,J-1,J-2,J-3,J-4,J-5,J-6,J-7,J-8,J-9','J-11,J-10',1,3,'2022-07-03 00:08:20','2022-07-03 10:30:00'),(5,'2022-07-05','2022-07-05 20:00:00','2022-07-05 22:00:00',1,100000,'A-0,A-1,A-2,A-3,A-4,A-5,A-6,A-7,A-8,A-9,A-10,A-11,A-12,A-13,A-14,B-0,B-1,B-2,B-3,B-4,B-5,B-6,B-7,B-8,B-9,B-10,B-11,B-12,B-13,B-14,C-0,C-1,C-2,C-3,C-4,C-5,C-6,C-7,C-8,C-9,C-10,C-11,C-12,C-13,C-14,D-0,D-1,D-2,D-3,D-4,D-5,D-6,D-7,D-8,D-9,D-10,D-11,D-12,D-13,D-14,E-0,E-1,E-2,E-3,E-4,E-5,E-6,E-7,E-8,E-9,E-10,E-11,E-12,E-13,E-14,F-0,F-1,F-2,F-3,F-4,F-5,F-6,F-7,F-8,F-9,F-10,F-11,F-12,F-13,F-14,G-0,G-1,G-2,G-3,G-4,G-5,G-6,G-7,G-8,G-9,G-10,G-11,G-12,G-13,G-14,H-0,H-1,H-2,H-3,H-4,H-5,H-6,H-7,H-8,H-9,H-10,H-11,H-12,H-13,H-14,I-0,I-1,I-2,I-3,I-4,I-5,I-6,I-7,I-8,I-9,I-10,I-11,I-12,I-13,I-14,J-0,J-1,J-2,J-3,J-4,J-5,J-6,J-7,J-8,J-9,J-10,J-11,J-12,J-13,J-14,K-0,K-1,K-2,K-3,K-4,K-5,K-6,K-7,K-8,K-9,K-10,K-11,K-12,K-13,K-14,L-0,L-1,L-2,L-3,L-4,L-5,L-6,L-7,L-8,L-9,L-10,L-11,L-12,L-13,L-14,M-0,M-1,M-2,M-3,M-4,M-5,M-6,M-7,M-8,M-9,M-10,M-11,M-12,M-13,M-14,N-0,N-1,N-2,N-3,N-4,N-5,N-6,N-7,N-8,N-9,N-10,N-11,N-12,N-13,N-14',NULL,13,2,'2022-07-04 12:51:00','2022-07-04 12:51:00'),(6,'2022-07-08','2022-07-08 22:00:00','2022-07-09 00:00:00',1,150000,'A-0,A-1,A-2,A-3,A-4,A-5,A-6,A-7,A-8,A-9,A-10,A-11,A-12,A-13,A-14,B-0,B-1,B-2,B-3,B-4,B-5,B-6,B-7,B-8,B-9,B-10,B-11,B-12,B-13,B-14,C-0,C-1,C-2,C-3,C-4,C-5,C-6,C-7,C-8,C-9,C-10,C-11,C-12,C-13,C-14,D-0,D-1,D-2,D-3,D-4,D-5,D-6,D-7,D-8,D-9,D-10,D-11,D-12,D-13,D-14,E-0,E-1,E-2,E-3,E-4,E-5,E-6,E-7,E-8,E-9,E-10,E-11,E-12,E-13,E-14,F-0,F-1,F-2,F-3,F-4,F-5,F-6,F-7,F-8,F-9,F-10,F-11,F-12,F-13,F-14,G-0,G-1,G-2,G-3,G-4,G-5,G-6,G-7,G-8,G-9,G-10,G-11,G-12,G-13,G-14,H-0,H-1,H-2,H-3,H-4,H-5,H-6,H-7,H-8,H-9,H-10,H-11,H-12,H-13,H-14,I-0,I-1,I-2,I-3,I-4,I-5,I-6,I-7,I-8,I-9,I-10,I-11,I-12,I-13,I-14,J-0,J-1,J-2,J-3,J-4,J-5,J-6,J-7,J-8,J-9,J-10,J-11,J-12,J-13,J-14,K-0,K-1,K-2,K-3,K-4,K-5,K-6,K-7,K-8,K-9,K-10,K-11,K-12,K-13,K-14,L-0,L-1,L-2,L-3,L-4,L-5,L-6,L-7,L-8,L-9,L-10,L-11,L-12,L-13,L-14,M-0,M-1,M-2,M-3,M-4,M-5,M-6,M-7,M-8,M-9,M-10,M-11,M-12,M-13,M-14,N-0,N-1,N-2,N-3,N-4,N-5,N-6,N-9,N-10,N-11,N-12,N-13,N-14','N-7,N-8',13,3,'2022-07-06 02:16:14','2022-07-06 22:29:09'),(7,'2022-07-19','2022-07-19 09:15:00','2022-07-19 12:00:00',2,80000,'A-0,A-1,A-2,A-3,A-4,A-5,A-6,A-7,A-8,A-9,A-10,A-11,B-0,B-1,B-2,B-3,B-4,B-5,B-6,B-7,B-8,B-9,B-10,B-11,C-0,C-1,C-2,C-3,C-4,C-5,C-6,C-7,C-8,C-9,C-10,C-11,D-0,D-1,D-2,D-3,D-4,D-5,D-6,D-7,D-8,D-9,D-10,D-11,E-0,E-1,E-2,E-3,E-4,E-5,E-6,E-7,E-8,E-9,E-10,E-11,F-0,F-1,F-2,F-3,F-4,F-5,F-6,F-7,F-8,F-9,F-10,F-11,G-0,G-1,G-2,G-3,G-4,G-5,G-6,G-7,G-8,G-9,G-10,G-11,H-0,H-1,H-2,H-3,H-4,H-5,H-6,H-7,H-8,H-9,H-10,H-11,I-0,I-1,I-2,I-3,I-4,I-5,I-6,I-7,I-8,I-9,I-10,I-11,J-0,J-1,J-2,J-3,J-4,J-6,J-7,J-8,J-9,J-10,J-11','J-5',7,1,'2022-07-18 20:51:53','2022-07-18 20:55:50'),(8,'2022-07-19','2022-07-19 09:10:00','2022-07-19 12:00:00',1,75000,'A-0,A-1,A-2,A-3,A-4,A-5,A-6,A-7,A-8,A-9,A-10,A-11,B-0,B-1,B-2,B-3,B-4,B-5,B-6,B-7,B-8,B-9,B-10,B-11,C-0,C-1,C-2,C-3,C-4,C-5,C-6,C-7,C-8,C-9,C-10,C-11,D-0,D-1,D-2,D-3,D-4,D-5,D-6,D-7,D-8,D-9,D-10,D-11,E-0,E-1,E-2,E-3,E-4,E-5,E-6,E-7,E-8,E-9,E-10,E-11,F-0,F-1,F-2,F-3,F-4,F-7,F-8,F-9,F-10,F-11,G-0,G-1,G-2,G-3,G-4,G-5,G-6,G-7,G-8,G-9,G-10,G-11,H-0,H-1,H-2,H-3,H-4,H-5,H-6,H-7,H-8,H-9,H-10,H-11,I-0,I-1,I-2,I-3,I-4,I-5,I-6,I-7,I-8,I-9,I-10,I-11,J-0,J-1,J-2,J-3,J-4,J-5,J-7,J-8,J-9,J-10,J-11','J-6,F-5,F-6',2,1,'2022-07-18 20:52:37','2022-07-19 09:01:11'),(9,'2022-07-21','2022-07-21 09:00:00','2022-07-21 11:00:00',1,80000,'A-0,A-1,A-2,A-3,A-4,A-5,A-6,A-7,A-8,A-9,A-10,A-11,A-12,A-13,A-14,B-0,B-1,B-2,B-3,B-4,B-5,B-6,B-7,B-8,B-9,B-10,B-11,B-12,B-13,B-14,C-0,C-1,C-2,C-3,C-4,C-5,C-6,C-7,C-8,C-9,C-10,C-11,C-12,C-13,C-14,D-0,D-1,D-2,D-3,D-4,D-5,D-6,D-7,D-8,D-9,D-10,D-11,D-12,D-13,D-14,E-0,E-1,E-2,E-3,E-4,E-5,E-6,E-7,E-8,E-9,E-10,E-11,E-12,E-13,E-14,F-0,F-1,F-2,F-3,F-4,F-5,F-6,F-7,F-8,F-9,F-10,F-11,F-12,F-13,F-14,G-0,G-1,G-2,G-3,G-4,G-5,G-6,G-7,G-8,G-9,G-10,G-11,G-12,G-13,G-14,H-0,H-1,H-2,H-3,H-4,H-5,H-6,H-7,H-8,H-9,H-10,H-11,H-12,H-13,H-14,I-0,I-1,I-2,I-3,I-4,I-5,I-6,I-7,I-8,I-9,I-10,I-11,I-12,I-13,I-14,J-0,J-1,J-2,J-3,J-4,J-5,J-6,J-7,J-8,J-9,J-10,J-11,J-12,J-13,J-14,K-0,K-1,K-2,K-3,K-4,K-5,K-6,K-7,K-8,K-9,K-10,K-11,K-12,K-13,K-14,L-0,L-1,L-2,L-3,L-4,L-5,L-6,L-7,L-8,L-9,L-10,L-11,L-12,L-13,L-14,M-0,M-1,M-2,M-3,M-4,M-5,M-6,M-7,M-8,M-9,M-10,M-11,M-12,M-13,M-14,N-0,N-1,N-2,N-3,N-4,N-5,N-6,N-7,N-8,N-9,N-10,N-11,N-12,N-13,N-14','',13,1,'2022-07-18 21:04:05','2022-07-18 21:07:46'),(10,'2022-07-19','2022-07-19 07:00:00','2022-07-19 09:00:00',1,65000,'A-0,A-1,A-2,A-3,A-4,A-5,A-6,A-7,A-8,A-9,A-10,A-11,B-0,B-1,B-2,B-3,B-4,B-5,B-6,B-7,B-8,B-9,B-10,B-11,C-0,C-1,C-2,C-3,C-4,C-5,C-6,C-7,C-8,C-9,C-10,C-11,D-0,D-1,D-2,D-3,D-4,D-5,D-6,D-7,D-8,D-9,D-10,D-11,E-0,E-1,E-2,E-3,E-4,E-5,E-6,E-7,E-8,E-9,E-10,E-11,F-0,F-1,F-2,F-3,F-4,F-5,F-6,F-7,F-8,F-9,F-10,F-11,G-0,G-1,G-2,G-3,G-4,G-5,G-6,G-7,G-8,G-9,G-10,G-11,H-0,H-1,H-2,H-3,H-4,H-5,H-6,H-7,H-8,H-9,H-10,H-11,I-0,I-1,I-2,I-3,I-4,I-5,I-6,I-7,I-8,I-9,I-10,I-11,J-0,J-1,J-2,J-3,J-4,J-5,J-6,J-7,J-8,J-9,J-10,J-11',NULL,2,1,'2022-07-19 06:58:16','2022-07-19 06:58:16'),(11,'2022-07-21','2022-07-21 07:00:00','2022-07-21 09:00:00',1,70000,'A-0,A-1,A-2,A-3,A-4,A-5,A-6,A-7,A-8,A-9,A-10,A-11,A-12,A-13,A-14,B-0,B-1,B-2,B-3,B-4,B-5,B-6,B-7,B-8,B-9,B-10,B-11,B-12,B-13,B-14,C-0,C-1,C-2,C-3,C-4,C-5,C-6,C-7,C-8,C-9,C-10,C-11,C-12,C-13,C-14,D-0,D-1,D-2,D-3,D-4,D-5,D-6,D-7,D-8,D-9,D-10,D-11,D-12,D-13,D-14,E-0,E-1,E-2,E-3,E-4,E-5,E-6,E-7,E-8,E-9,E-10,E-11,E-12,E-13,E-14,F-0,F-1,F-2,F-3,F-4,F-5,F-6,F-7,F-8,F-9,F-10,F-11,F-12,F-13,F-14,G-0,G-1,G-2,G-3,G-4,G-5,G-6,G-7,G-8,G-9,G-10,G-11,G-12,G-13,G-14,H-0,H-1,H-2,H-3,H-4,H-5,H-6,H-7,H-8,H-9,H-10,H-11,H-12,H-13,H-14,I-0,I-1,I-2,I-3,I-4,I-5,I-6,I-7,I-8,I-9,I-10,I-11,I-12,I-13,I-14,J-0,J-1,J-2,J-3,J-4,J-5,J-6,J-7,J-8,J-9,J-10,J-11,J-12,J-13,J-14,K-0,K-1,K-2,K-3,K-4,K-5,K-6,K-7,K-8,K-9,K-10,K-11,K-12,K-13,K-14,L-0,L-1,L-2,L-3,L-4,L-5,L-6,L-7,L-8,L-9,L-10,L-11,L-12,L-13,L-14,M-0,M-1,M-2,M-3,M-4,M-5,M-6,M-7,M-8,M-9,M-10,M-11,M-12,M-13,M-14,N-0,N-1,N-2,N-3,N-4,N-5,N-6,N-7,N-8,N-9,N-10,N-11,N-12,N-13,N-14',NULL,13,1,'2022-07-19 07:06:02','2022-07-19 07:06:02');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_roles` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,12),(2,1),(3,11),(4,12),(7,12),(8,1),(8,11),(9,12),(10,12);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fullname` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `register_verifying_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_password_hash` (`password_hash`),
  KEY `users_fullname` (`fullname`),
  KEY `users_username` (`username`),
  KEY `users_phone` (`phone`),
  KEY `users_register_verifying_token` (`register_verifying_token`),
  KEY `users_email` (`email`),
  KEY `users_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ramenhoang','$2b$05$N8lRL7pSY6rn5q6S7UGlZu5IzcKLs1kkOVaw86mePdUCYNKVT9dxG','0123456789','Nguyễn Hoàng Anh',NULL,'anhnguyenhoang321@gmail.com','Nguyễn Hoàng Anh','2021-02-08 06:21:20','2021-02-08 06:21:20'),(2,'lieule99','$2b$05$N8lRL7pSY6rn5q6S7UGlZu5IzcKLs1kkOVaw86mePdUCYNKVT9dxG','0123456789','Lê Thị Liễu',NULL,'lieule070999@gmail.com','Lê Thị Liễu','2021-02-08 06:21:20','2021-02-08 06:21:20'),(3,'quangluu99','$2b$05$N8lRL7pSY6rn5q6S7UGlZu5IzcKLs1kkOVaw86mePdUCYNKVT9dxG','0123456789','Võ Quang Lưu',NULL,'voquangluu997@gmail.com','Võ Quang Lưu','2021-02-08 06:21:20','2021-02-08 06:21:20'),(4,'ramenhoang123','$2b$05$N8lRL7pSY6rn5q6S7UGlZu5IzcKLs1kkOVaw86mePdUCYNKVT9dxG','0357386016','Nguyễn Hoàng Anh',NULL,'anhnguyenhoang321+1@gmail.com','Anh','2022-06-04 05:56:39','2022-06-04 05:56:59'),(7,'hoanganh','$2b$05$4lGPdLYRKG0lZU31QJri9.OEVk4zylfBtwoyF0PYYgufrvbtuX99S','0357386016','Nguyễn Hoàng Anh',NULL,'anhnguyenhoang321+2@gmail.com','test','2022-06-12 22:29:46','2022-06-12 22:34:35'),(8,'soatve','$2b$05$RVfkACTSVKLmFAifv.MJ6eYcvW4j8GHxRpcJMVN.BvmA.dZxxHwyy','0123456789',NULL,NULL,'soatve@gmail.com','soatve','2022-07-06 03:03:03','2022-07-06 04:34:13'),(9,'account1','$2b$05$MZ0EAX59Kc/3xL0t/2Fl0erLqJpgvTVo30ap/D0/LrT/Hc82h1qdq','0357386016','Nguyễn Hoàng Anh',NULL,'anhnguyenhoang321+1@gmail.com','test','2022-07-06 22:31:57','2022-07-06 22:33:02'),(10,'hoanganh12','$2b$05$LCSPertQH3R1oIYJMNI5wOLdpGZJQtSqWQFMnwJr5PmfD9UE62Vxm','0357386016','Nguyễn Hoàng Anh',NULL,'anhnguyenhoang321+12@gmail.com','test','2022-07-19 07:13:08','2022-07-19 07:13:27');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-06 20:00:50
