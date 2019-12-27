/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100406
 Source Host           : localhost:3306
 Source Schema         : aiday

 Target Server Type    : MySQL
 Target Server Version : 100406
 File Encoding         : 65001

 Date: 27/12/2019 21:45:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for login_record
-- ----------------------------
DROP TABLE IF EXISTS `login_record`;
CREATE TABLE `login_record`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `ip` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `extra` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) NOT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  `message` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 184 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES (1, 1, 1, 'áa', '2019-12-25 15:26:14', '2019-12-25 15:26:14');
INSERT INTO `message` VALUES (2, 1, 1, 'áa', '2019-12-25 15:26:14', '2019-12-25 15:26:14');
INSERT INTO `message` VALUES (3, 1, 1, 'a', '2019-12-25 15:26:19', '2019-12-25 15:26:19');
INSERT INTO `message` VALUES (4, 1, 1, 'a', '2019-12-25 15:26:19', '2019-12-25 15:26:19');
INSERT INTO `message` VALUES (5, 1, 1, 'aâss', '2019-12-25 15:26:38', '2019-12-25 15:26:38');
INSERT INTO `message` VALUES (6, 1, 1, 'aâss', '2019-12-25 15:26:38', '2019-12-25 15:26:38');
INSERT INTO `message` VALUES (7, 1, 1, 'h', '2019-12-25 15:30:59', '2019-12-25 15:30:59');
INSERT INTO `message` VALUES (8, 1, 1, 'b', '2019-12-25 15:31:06', '2019-12-25 15:31:06');
INSERT INTO `message` VALUES (9, 1, 1, 'a', '2019-12-25 15:33:33', '2019-12-25 15:33:33');
INSERT INTO `message` VALUES (10, 1, 1, 'test', '2019-12-25 15:34:36', '2019-12-25 15:34:36');
INSERT INTO `message` VALUES (11, 1, 1, 'a', '2019-12-25 15:36:06', '2019-12-25 15:36:06');
INSERT INTO `message` VALUES (12, 1, 1, 'sđs', '2019-12-25 15:36:09', '2019-12-25 15:36:09');
INSERT INTO `message` VALUES (13, 1, 1, 'âs', '2019-12-25 15:36:16', '2019-12-25 15:36:16');
INSERT INTO `message` VALUES (14, 1, 1, 'test', '2019-12-25 15:36:24', '2019-12-25 15:36:24');
INSERT INTO `message` VALUES (15, 1, 1, 'a', '2019-12-25 15:36:47', '2019-12-25 15:36:47');
INSERT INTO `message` VALUES (16, 1, 1, '´ds', '2019-12-25 15:37:49', '2019-12-25 15:37:49');
INSERT INTO `message` VALUES (17, 1, 1, 'aaaa', '2019-12-25 15:40:01', '2019-12-25 15:40:01');
INSERT INTO `message` VALUES (18, 1, 1, 'hihi', '2019-12-25 15:40:28', '2019-12-25 15:40:28');
INSERT INTO `message` VALUES (19, 1, 2, 'E', '2019-12-25 15:41:42', '2019-12-25 15:41:42');
INSERT INTO `message` VALUES (20, 1, 2, 'Hehe', '2019-12-25 15:41:51', '2019-12-25 15:41:51');
INSERT INTO `message` VALUES (21, 1, 2, 'Wtf', '2019-12-25 15:41:56', '2019-12-25 15:41:56');
INSERT INTO `message` VALUES (22, 1, 1, 'hu', '2019-12-25 15:42:06', '2019-12-25 15:42:06');
INSERT INTO `message` VALUES (23, 1, 2, 'He', '2019-12-25 15:43:50', '2019-12-25 15:43:50');
INSERT INTO `message` VALUES (24, 1, 2, 'He', '2019-12-25 15:43:50', '2019-12-25 15:43:50');
INSERT INTO `message` VALUES (25, 1, 2, ':v', '2019-12-25 15:43:58', '2019-12-25 15:43:58');
INSERT INTO `message` VALUES (26, 1, 2, ':v', '2019-12-25 15:43:58', '2019-12-25 15:43:58');
INSERT INTO `message` VALUES (27, 1, 1, ':((', '2019-12-25 15:44:17', '2019-12-25 15:44:17');
INSERT INTO `message` VALUES (28, 1, 1, ':((', '2019-12-25 15:44:17', '2019-12-25 15:44:17');
INSERT INTO `message` VALUES (29, 1, 1, ':/', '2019-12-25 15:44:28', '2019-12-25 15:44:28');
INSERT INTO `message` VALUES (30, 1, 1, ':/', '2019-12-25 15:44:28', '2019-12-25 15:44:28');
INSERT INTO `message` VALUES (31, 1, 2, ':v', '2019-12-25 15:45:09', '2019-12-25 15:45:09');
INSERT INTO `message` VALUES (32, 1, 2, ':v', '2019-12-25 15:45:09', '2019-12-25 15:45:09');
INSERT INTO `message` VALUES (33, 1, 2, ':(', '2019-12-25 15:45:20', '2019-12-25 15:45:20');
INSERT INTO `message` VALUES (34, 1, 2, ':(', '2019-12-25 15:45:20', '2019-12-25 15:45:20');
INSERT INTO `message` VALUES (35, 1, 1, 'hello', '2019-12-25 15:46:24', '2019-12-25 15:46:24');
INSERT INTO `message` VALUES (36, 1, 1, ':v', '2019-12-25 15:48:00', '2019-12-25 15:48:00');
INSERT INTO `message` VALUES (37, 1, 1, ':(', '2019-12-25 15:48:12', '2019-12-25 15:48:12');
INSERT INTO `message` VALUES (38, 1, 1, '-.-', '2019-12-25 15:48:20', '2019-12-25 15:48:20');
INSERT INTO `message` VALUES (39, 1, 2, ':v', '2019-12-25 15:49:46', '2019-12-25 15:49:46');
INSERT INTO `message` VALUES (40, 1, 2, ':(', '2019-12-25 15:50:00', '2019-12-25 15:50:00');
INSERT INTO `message` VALUES (41, 1, 2, ':v', '2019-12-25 16:15:01', '2019-12-25 16:15:01');
INSERT INTO `message` VALUES (42, 1, 2, ':v', '2019-12-25 16:15:01', '2019-12-25 16:15:01');
INSERT INTO `message` VALUES (43, 1, 2, 'Hh', '2019-12-25 16:15:25', '2019-12-25 16:15:25');
INSERT INTO `message` VALUES (44, 1, 2, 'Hh', '2019-12-25 16:15:25', '2019-12-25 16:15:25');
INSERT INTO `message` VALUES (45, 1, 2, ':v', '2019-12-25 16:15:30', '2019-12-25 16:15:30');
INSERT INTO `message` VALUES (46, 1, 2, ':v', '2019-12-25 16:15:30', '2019-12-25 16:15:30');
INSERT INTO `message` VALUES (47, 1, 2, ':v', '2019-12-25 16:15:40', '2019-12-25 16:15:40');
INSERT INTO `message` VALUES (48, 1, 2, ':v', '2019-12-25 16:15:40', '2019-12-25 16:15:40');
INSERT INTO `message` VALUES (49, 1, 2, 'Vv', '2019-12-25 16:15:53', '2019-12-25 16:15:53');
INSERT INTO `message` VALUES (50, 1, 2, 'Vv', '2019-12-25 16:15:53', '2019-12-25 16:15:53');
INSERT INTO `message` VALUES (51, 1, 2, 'Uuu', '2019-12-25 16:15:58', '2019-12-25 16:15:58');
INSERT INTO `message` VALUES (52, 1, 2, 'Uuu', '2019-12-25 16:15:58', '2019-12-25 16:15:58');
INSERT INTO `message` VALUES (53, 1, 1, ':v', '2019-12-25 16:16:14', '2019-12-25 16:16:14');
INSERT INTO `message` VALUES (54, 1, 1, ':v', '2019-12-25 16:16:14', '2019-12-25 16:16:14');
INSERT INTO `message` VALUES (55, 1, 1, ':v', '2019-12-25 16:19:19', '2019-12-25 16:19:19');
INSERT INTO `message` VALUES (56, 1, 1, ':v', '2019-12-25 16:20:41', '2019-12-25 16:20:41');
INSERT INTO `message` VALUES (57, 1, 1, ':v', '2019-12-25 16:23:33', '2019-12-25 16:23:33');
INSERT INTO `message` VALUES (58, 1, 1, 'hmmm', '2019-12-25 16:24:30', '2019-12-25 16:24:30');
INSERT INTO `message` VALUES (59, 1, 1, 'chán', '2019-12-25 16:24:36', '2019-12-25 16:24:36');
INSERT INTO `message` VALUES (60, 1, 2, 'Chán thiệt chứ', '2019-12-25 16:24:49', '2019-12-25 16:24:49');
INSERT INTO `message` VALUES (61, 1, 2, ':(', '2019-12-25 16:25:02', '2019-12-25 16:25:02');
INSERT INTO `message` VALUES (62, 1, 2, ':(', '2019-12-25 16:25:11', '2019-12-25 16:25:11');
INSERT INTO `message` VALUES (63, 1, 2, 'Huhu', '2019-12-25 16:25:28', '2019-12-25 16:25:28');
INSERT INTO `message` VALUES (64, 1, 2, ':v', '2019-12-25 16:25:44', '2019-12-25 16:25:44');
INSERT INTO `message` VALUES (65, 1, 2, ':))', '2019-12-25 16:27:06', '2019-12-25 16:27:06');
INSERT INTO `message` VALUES (66, 1, 2, ':(', '2019-12-25 16:27:12', '2019-12-25 16:27:12');
INSERT INTO `message` VALUES (67, 1, 2, ':v', '2019-12-25 16:27:33', '2019-12-25 16:27:33');
INSERT INTO `message` VALUES (68, 1, 2, 'Hihi', '2019-12-25 16:32:49', '2019-12-25 16:32:49');
INSERT INTO `message` VALUES (69, 1, 2, 'A', '2019-12-25 16:33:48', '2019-12-25 16:33:48');
INSERT INTO `message` VALUES (70, 1, 2, ':(', '2019-12-25 16:33:54', '2019-12-25 16:33:54');
INSERT INTO `message` VALUES (71, 1, 2, 'Aa', '2019-12-25 16:35:51', '2019-12-25 16:35:51');
INSERT INTO `message` VALUES (72, 1, 2, 'Xin chào tất cả các bạn', '2019-12-25 16:36:45', '2019-12-25 16:36:45');
INSERT INTO `message` VALUES (73, 1, 2, 'A', '2019-12-25 16:55:58', '2019-12-25 16:55:58');
INSERT INTO `message` VALUES (74, 1, 2, ':(', '2019-12-25 16:56:04', '2019-12-25 16:56:04');
INSERT INTO `message` VALUES (75, 1, 2, ':(', '2019-12-25 17:04:27', '2019-12-25 17:04:27');
INSERT INTO `message` VALUES (76, 1, 2, ':v', '2019-12-25 17:04:36', '2019-12-25 17:04:36');
INSERT INTO `message` VALUES (77, 1, 1, ':(', '2019-12-25 17:06:58', '2019-12-25 17:06:58');
INSERT INTO `message` VALUES (78, 1, 1, ':(', '2019-12-25 17:07:04', '2019-12-25 17:07:04');
INSERT INTO `message` VALUES (79, 1, 2, ':v', '2019-12-25 17:08:07', '2019-12-25 17:08:07');
INSERT INTO `message` VALUES (80, 1, 2, ':(', '2019-12-25 17:18:50', '2019-12-25 17:18:50');
INSERT INTO `message` VALUES (81, 1, 1, ':(', '2019-12-25 17:20:36', '2019-12-25 17:20:36');
INSERT INTO `message` VALUES (82, 1, 1, ':v', '2019-12-25 17:21:12', '2019-12-25 17:21:12');
INSERT INTO `message` VALUES (83, 1, 1, ':(', '2019-12-25 17:21:38', '2019-12-25 17:21:38');
INSERT INTO `message` VALUES (84, 1, 1, ':v', '2019-12-25 17:21:44', '2019-12-25 17:21:44');
INSERT INTO `message` VALUES (85, 1, 1, ':(', '2019-12-25 17:21:48', '2019-12-25 17:21:48');
INSERT INTO `message` VALUES (86, 1, 1, ':v', '2019-12-25 17:21:59', '2019-12-25 17:21:59');
INSERT INTO `message` VALUES (87, 1, 1, ':(', '2019-12-25 17:22:05', '2019-12-25 17:22:05');
INSERT INTO `message` VALUES (88, 1, 2, ':((', '2019-12-25 17:22:09', '2019-12-25 17:22:09');
INSERT INTO `message` VALUES (89, 1, 2, ':((', '2019-12-25 17:22:15', '2019-12-25 17:22:15');
INSERT INTO `message` VALUES (90, 1, 2, ':v', '2019-12-25 17:22:19', '2019-12-25 17:22:19');
INSERT INTO `message` VALUES (91, 1, 2, ':(', '2019-12-25 17:22:22', '2019-12-25 17:22:22');
INSERT INTO `message` VALUES (92, 1, 2, ':v', '2019-12-25 17:22:25', '2019-12-25 17:22:25');
INSERT INTO `message` VALUES (93, 1, 2, 'Aaaaaa', '2019-12-25 17:22:28', '2019-12-25 17:22:28');
INSERT INTO `message` VALUES (94, 1, 2, ':(', '2019-12-25 17:22:31', '2019-12-25 17:22:31');
INSERT INTO `message` VALUES (95, 1, 2, ':v', '2019-12-25 17:23:04', '2019-12-25 17:23:04');
INSERT INTO `message` VALUES (96, 1, 2, 'Mm', '2019-12-25 17:23:49', '2019-12-25 17:23:49');
INSERT INTO `message` VALUES (97, 1, 2, ':v', '2019-12-25 17:33:03', '2019-12-25 17:33:03');
INSERT INTO `message` VALUES (98, 1, 2, ':v', '2019-12-25 19:41:44', '2019-12-25 19:41:44');
INSERT INTO `message` VALUES (99, 1, 1, 'vui nhỉ', '2019-12-25 19:41:57', '2019-12-25 19:41:57');
INSERT INTO `message` VALUES (100, 1, 1, ':(', '2019-12-25 19:42:03', '2019-12-25 19:42:03');
INSERT INTO `message` VALUES (101, 1, 1, ':v', '2019-12-25 20:05:11', '2019-12-25 20:05:11');
INSERT INTO `message` VALUES (102, 1, 1, ':(', '2019-12-25 20:05:18', '2019-12-25 20:05:18');
INSERT INTO `message` VALUES (103, 1, 1, ':(', '2019-12-25 20:05:22', '2019-12-25 20:05:22');
INSERT INTO `message` VALUES (104, 1, 1, ':((', '2019-12-25 20:05:29', '2019-12-25 20:05:29');
INSERT INTO `message` VALUES (105, 1, 1, ':(', '2019-12-25 20:05:36', '2019-12-25 20:05:36');
INSERT INTO `message` VALUES (106, 1, 1, ':(', '2019-12-25 20:05:45', '2019-12-25 20:05:45');
INSERT INTO `message` VALUES (107, 1, 2, ':v', '2019-12-26 21:25:05', '2019-12-26 21:25:05');
INSERT INTO `message` VALUES (108, 1, 2, ':(', '2019-12-26 21:25:11', '2019-12-26 21:25:11');
INSERT INTO `message` VALUES (109, 1, 2, 'A', '2019-12-26 22:14:57', '2019-12-26 22:14:57');
INSERT INTO `message` VALUES (110, 1, 2, 'Aaa', '2019-12-26 22:15:03', '2019-12-26 22:15:03');
INSERT INTO `message` VALUES (111, 1, 1, 'hi', '2019-12-26 22:15:51', '2019-12-26 22:15:51');
INSERT INTO `message` VALUES (112, 1, 1, 'bar', '2019-12-26 22:15:55', '2019-12-26 22:15:55');
INSERT INTO `message` VALUES (113, 1, 1, 'hihi', '2019-12-26 22:17:00', '2019-12-26 22:17:00');
INSERT INTO `message` VALUES (114, 1, 2, ':33333333', '2019-12-26 22:21:30', '2019-12-26 22:21:30');
INSERT INTO `message` VALUES (115, 1, 2, ':v', '2019-12-26 22:21:59', '2019-12-26 22:21:59');
INSERT INTO `message` VALUES (116, 1, 2, ':v', '2019-12-26 22:23:03', '2019-12-26 22:23:03');
INSERT INTO `message` VALUES (117, 1, 2, 'Ừ ui', '2019-12-26 22:23:47', '2019-12-26 22:23:47');
INSERT INTO `message` VALUES (118, 1, 2, ':v', '2019-12-26 15:24:40', '2019-12-26 15:24:40');
INSERT INTO `message` VALUES (119, 1, 2, ':v', '2019-12-26 22:27:13', '2019-12-26 22:27:13');
INSERT INTO `message` VALUES (120, 1, 2, ':(', '2019-12-26 22:27:27', '2019-12-26 22:27:27');
INSERT INTO `message` VALUES (121, 1, 2, '<3', '2019-12-26 22:30:11', '2019-12-26 22:30:11');
INSERT INTO `message` VALUES (122, 1, 2, ':(', '2019-12-26 22:33:00', '2019-12-26 22:33:00');
INSERT INTO `message` VALUES (123, 1, 2, ':(', '2019-12-26 22:39:36', '2019-12-26 22:39:36');
INSERT INTO `message` VALUES (124, 1, 2, ':v', '2019-12-26 22:39:51', '2019-12-26 22:39:51');
INSERT INTO `message` VALUES (125, 1, 2, 'Cuối', '2019-12-26 22:40:43', '2019-12-26 22:40:43');
INSERT INTO `message` VALUES (126, 1, 2, 'Đây là rin nhắn cuối', '2019-12-26 22:42:19', '2019-12-26 22:42:19');
INSERT INTO `message` VALUES (127, 1, 2, ':(', '2019-12-26 22:42:44', '2019-12-26 22:42:44');
INSERT INTO `message` VALUES (128, 1, 2, ':(', '2019-12-26 22:44:35', '2019-12-26 22:44:35');
INSERT INTO `message` VALUES (129, 6, 2, ':v', '2019-12-27 00:54:58', '2019-12-27 00:54:58');
INSERT INTO `message` VALUES (130, 6, 2, ':v', '2019-12-27 00:54:58', '2019-12-27 00:54:58');
INSERT INTO `message` VALUES (131, 6, 2, ':/', '2019-12-27 01:04:36', '2019-12-27 01:04:36');
INSERT INTO `message` VALUES (132, 6, 1, ':v', '2019-12-27 01:04:51', '2019-12-27 01:04:51');
INSERT INTO `message` VALUES (133, 6, 1, ':(', '2019-12-27 01:05:01', '2019-12-27 01:05:01');
INSERT INTO `message` VALUES (134, 6, 2, 'Hôm nay là ngày mấy vậy mọi người :(', '2019-12-27 01:05:20', '2019-12-27 01:05:20');
INSERT INTO `message` VALUES (135, 6, 2, 'Trả lời đi pls', '2019-12-27 01:05:40', '2019-12-27 01:05:40');
INSERT INTO `message` VALUES (136, 6, 2, ':(', '2019-12-27 01:05:44', '2019-12-27 01:05:44');
INSERT INTO `message` VALUES (137, 6, 2, ':((', '2019-12-27 01:05:48', '2019-12-27 01:05:48');
INSERT INTO `message` VALUES (138, 6, 2, ':(', '2019-12-27 01:05:54', '2019-12-27 01:05:54');
INSERT INTO `message` VALUES (139, 6, 1, ':(', '2019-12-27 01:08:46', '2019-12-27 01:08:46');
INSERT INTO `message` VALUES (140, 6, 1, ':(', '2019-12-27 01:08:57', '2019-12-27 01:08:57');
INSERT INTO `message` VALUES (141, 6, 1, '...............................', '2019-12-27 01:10:26', '2019-12-27 01:10:26');
INSERT INTO `message` VALUES (142, 1, 2, ':v', '2019-12-27 01:12:20', '2019-12-27 01:12:20');
INSERT INTO `message` VALUES (143, 1, 2, ':(', '2019-12-27 01:15:19', '2019-12-27 01:15:19');
INSERT INTO `message` VALUES (144, 1, 1, ':(', '2019-12-27 01:16:23', '2019-12-27 01:16:23');
INSERT INTO `message` VALUES (145, 1, 1, ':3', '2019-12-27 01:19:39', '2019-12-27 01:19:39');
INSERT INTO `message` VALUES (146, 1, 2, '???', '2019-12-27 10:57:18', '2019-12-27 10:57:18');
INSERT INTO `message` VALUES (147, 1, 2, 'image:https://i.imgur.com/dzQZrti.jpg\n', '2019-12-27 11:09:45', '2019-12-27 11:09:45');
INSERT INTO `message` VALUES (148, 6, 2, 'image:https://i.imgur.com/Jzr4FiH.jpg\n', '2019-12-27 11:12:53', '2019-12-27 11:12:53');
INSERT INTO `message` VALUES (149, 6, 2, 'image:https://i.imgur.com/tOerBVS.jpg', '2019-12-27 11:13:55', '2019-12-27 11:13:55');
INSERT INTO `message` VALUES (150, 6, 2, 'image:https://i.imgur.com/SPYMPwP.jpg\n', '2019-12-27 11:16:09', '2019-12-27 11:16:09');
INSERT INTO `message` VALUES (151, 6, 2, 'image:https://i.imgur.com/ZQuYiOz.jpg', '2019-12-27 11:17:48', '2019-12-27 11:17:48');
INSERT INTO `message` VALUES (152, 6, 2, 'image:https://i.imgur.com/sT87vGy.jpg', '2019-12-27 11:17:56', '2019-12-27 11:17:56');
INSERT INTO `message` VALUES (153, 1, 1, ':(', '2019-12-27 12:51:00', '2019-12-27 12:51:00');
INSERT INTO `message` VALUES (154, 1, 1, ':(', '2019-12-27 12:56:55', '2019-12-27 12:56:55');
INSERT INTO `message` VALUES (155, 1, 1, ':(', '2019-12-27 12:56:55', '2019-12-27 12:56:55');
INSERT INTO `message` VALUES (156, 1, 1, ':(', '2019-12-27 13:01:52', '2019-12-27 13:01:52');
INSERT INTO `message` VALUES (157, 1, 1, ':(', '2019-12-27 13:01:52', '2019-12-27 13:01:52');
INSERT INTO `message` VALUES (158, 1, 1, ':(', '2019-12-27 13:01:52', '2019-12-27 13:01:52');
INSERT INTO `message` VALUES (159, 1, 1, 'vui nhể', '2019-12-27 13:02:13', '2019-12-27 13:02:13');
INSERT INTO `message` VALUES (160, 1, 1, 'vui nhể', '2019-12-27 13:02:13', '2019-12-27 13:02:13');
INSERT INTO `message` VALUES (161, 1, 1, 'vui nhể', '2019-12-27 13:02:13', '2019-12-27 13:02:13');
INSERT INTO `message` VALUES (162, 1, 2, ':(', '2019-12-27 13:02:34', '2019-12-27 13:02:34');
INSERT INTO `message` VALUES (163, 1, 1, ':v', '2019-12-27 13:02:40', '2019-12-27 13:02:40');
INSERT INTO `message` VALUES (164, 1, 1, ':v', '2019-12-27 13:02:40', '2019-12-27 13:02:40');
INSERT INTO `message` VALUES (165, 1, 1, ':v', '2019-12-27 13:02:40', '2019-12-27 13:02:40');
INSERT INTO `message` VALUES (166, 1, 2, 'image:https://i.imgur.com/lAspzY9.jpg', '2019-12-27 13:03:23', '2019-12-27 13:03:23');
INSERT INTO `message` VALUES (167, 1, 2, ':((', '2019-12-27 13:04:09', '2019-12-27 13:04:09');
INSERT INTO `message` VALUES (168, 6, 1, 'huhu', '2019-12-27 13:08:12', '2019-12-27 13:08:12');
INSERT INTO `message` VALUES (169, 6, 1, 'huhu', '2019-12-27 13:08:12', '2019-12-27 13:08:12');
INSERT INTO `message` VALUES (170, 6, 1, 'huhu', '2019-12-27 13:08:12', '2019-12-27 13:08:12');
INSERT INTO `message` VALUES (171, 1, 1, ':(', '2019-12-27 13:48:37', '2019-12-27 13:48:37');
INSERT INTO `message` VALUES (172, 6, 2, ':(', '2019-12-27 20:09:13', '2019-12-27 20:09:13');
INSERT INTO `message` VALUES (173, 6, 2, ':(', '2019-12-27 20:09:13', '2019-12-27 20:09:13');
INSERT INTO `message` VALUES (174, 6, 2, ':(', '2019-12-27 20:10:30', '2019-12-27 20:10:30');
INSERT INTO `message` VALUES (175, 6, 2, ':(', '2019-12-27 20:10:30', '2019-12-27 20:10:30');
INSERT INTO `message` VALUES (176, 6, 2, ':(', '2019-12-27 20:10:48', '2019-12-27 20:10:48');
INSERT INTO `message` VALUES (177, 6, 2, ':(', '2019-12-27 20:10:48', '2019-12-27 20:10:48');
INSERT INTO `message` VALUES (178, 6, 2, ':(', '2019-12-27 20:11:28', '2019-12-27 20:11:28');
INSERT INTO `message` VALUES (179, 6, 2, ':v', '2019-12-27 20:11:40', '2019-12-27 20:11:40');
INSERT INTO `message` VALUES (180, 6, 2, ':v', '2019-12-27 20:12:11', '2019-12-27 20:12:11');
INSERT INTO `message` VALUES (181, 6, 2, ':((((((', '2019-12-27 20:12:20', '2019-12-27 20:12:20');
INSERT INTO `message` VALUES (182, 6, 1, 'ok hello', '2019-12-27 20:13:49', '2019-12-27 20:13:49');
INSERT INTO `message` VALUES (183, 6, 1, 'what supp', '2019-12-27 20:13:55', '2019-12-27 20:13:55');

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `value` tinyint(4) NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for private_room
-- ----------------------------
DROP TABLE IF EXISTS `private_room`;
CREATE TABLE `private_room`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) NOT NULL,
  `user1_id` int(11) NOT NULL,
  `user2_id` int(11) NOT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of private_room
-- ----------------------------
INSERT INTO `private_room` VALUES (1, 1, 1, 2, '2019-12-25 12:38:53', '2019-12-25 12:38:53');
INSERT INTO `private_room` VALUES (2, 2, 2, 3, '2019-12-25 13:08:44', '2019-12-25 13:08:44');
INSERT INTO `private_room` VALUES (3, 7, 1, 3, '2019-12-27 13:57:42', '2019-12-27 13:57:42');
INSERT INTO `private_room` VALUES (4, 8, 1, 4, '2019-12-27 13:57:49', '2019-12-27 13:57:49');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `room_id` int(11) NULL DEFAULT NULL,
  `creator_id` int(11) NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for room
-- ----------------------------
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `creator_id` int(11) NULL DEFAULT NULL,
  `password` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `is_private` tinyint(1) NOT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of room
-- ----------------------------
INSERT INTO `room` VALUES (1, '1 - 2', 1, NULL, 1, '2019-12-25 12:38:52', '2019-12-25 12:38:52');
INSERT INTO `room` VALUES (2, '2 - 3', 2, NULL, 1, '2019-12-25 13:08:44', '2019-12-25 13:08:44');
INSERT INTO `room` VALUES (3, 'Phòng chat 1', 2, NULL, 0, '2019-12-27 00:40:34', '2019-12-27 00:40:34');
INSERT INTO `room` VALUES (4, 'Phòng chat 2', 2, NULL, 0, '2019-12-27 00:45:25', '2019-12-27 00:45:25');
INSERT INTO `room` VALUES (5, 'Phòng chat 3', 2, '12345', 0, '2019-12-27 00:46:10', '2019-12-27 00:46:10');
INSERT INTO `room` VALUES (6, 'Phòng chat 4', 2, '12345', 0, '2019-12-27 00:46:38', '2019-12-27 00:46:38');
INSERT INTO `room` VALUES (7, '1 - 3', 1, NULL, 1, '2019-12-27 13:57:42', '2019-12-27 13:57:42');
INSERT INTO `room` VALUES (8, '1 - 4', 1, NULL, 1, '2019-12-27 13:57:49', '2019-12-27 13:57:49');

-- ----------------------------
-- Table structure for room_user
-- ----------------------------
DROP TABLE IF EXISTS `room_user`;
CREATE TABLE `room_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of room_user
-- ----------------------------
INSERT INTO `room_user` VALUES (1, 1, 1, 0, '2019-12-25 12:38:53', '2019-12-25 12:38:53');
INSERT INTO `room_user` VALUES (2, 1, 2, 0, '2019-12-25 12:38:53', '2019-12-25 12:38:53');
INSERT INTO `room_user` VALUES (3, 2, 2, 0, '2019-12-25 13:08:44', '2019-12-25 13:08:44');
INSERT INTO `room_user` VALUES (4, 2, 3, 0, '2019-12-25 13:08:44', '2019-12-25 13:08:44');
INSERT INTO `room_user` VALUES (5, 3, 2, 0, '2019-12-27 00:40:34', '2019-12-27 00:40:34');
INSERT INTO `room_user` VALUES (6, 4, 2, 0, '2019-12-27 00:45:25', '2019-12-27 00:45:25');
INSERT INTO `room_user` VALUES (7, 5, 2, 0, '2019-12-27 00:46:10', '2019-12-27 00:46:10');
INSERT INTO `room_user` VALUES (8, 6, 2, 0, '2019-12-27 00:46:38', '2019-12-27 00:46:38');
INSERT INTO `room_user` VALUES (9, 6, 1, 1, '2019-12-27 01:04:20', '2019-12-27 01:04:20');
INSERT INTO `room_user` VALUES (10, 3, 1, 1, '2019-12-27 09:20:13', '2019-12-27 09:20:13');
INSERT INTO `room_user` VALUES (11, 5, 1, 1, '2019-12-27 13:55:03', '2019-12-27 13:55:03');
INSERT INTO `room_user` VALUES (12, 7, 1, 0, '2019-12-27 13:57:42', '2019-12-27 13:57:42');
INSERT INTO `room_user` VALUES (13, 7, 3, 0, '2019-12-27 13:57:42', '2019-12-27 13:57:42');
INSERT INTO `room_user` VALUES (14, 8, 1, 0, '2019-12-27 13:57:49', '2019-12-27 13:57:49');
INSERT INTO `room_user` VALUES (15, 8, 4, 0, '2019-12-27 13:57:49', '2019-12-27 13:57:49');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `birthday` date NOT NULL,
  `display_name` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'takashato', '$2b$10$H.dX9QpEjhHgjEq6m3st5OygDMALIxwTIeHMwj7iKfdr9q0m3nux2', 'takashato@gmail.com', '1999-12-31', 'Bành Thanh Sơn', 'https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/brand-logo.a78e4b51.png', 1, '2019-12-23 21:42:26', '2019-12-23 23:28:51');
INSERT INTO `user` VALUES (2, 'aoyama', '$2b$10$PuvYasloNk7vthfUIctxaufvJMXF.CLm59qs3.zAKg801JZA7vLKy', 'user@aiday.com', '2019-12-24', 'Aoyama', 'https://i.imgur.com/TJ8pzyS.jpg', 0, '2019-12-24 14:02:37', '2019-12-27 20:41:57');
INSERT INTO `user` VALUES (3, 'kawakashi', '123456', 'kawakashi@aiday.com', '1999-01-01', 'Phạm Trần Chính', 'https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/brand-logo.a78e4b51.png', 1, '2019-12-24 16:24:57', '2019-12-24 16:25:00');
INSERT INTO `user` VALUES (4, 'nguyenhuy', '123456', 'nguyenhuy@aiday.com', '1999-01-01', 'Trần Hiệp Nguyên Huy', 'https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/brand-logo.a78e4b51.png', 1, '2019-12-24 16:37:28', '2019-12-24 16:37:31');

SET FOREIGN_KEY_CHECKS = 1;
