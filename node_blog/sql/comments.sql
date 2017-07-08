/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50520
Source Host           : 127.0.0.1:3306
Source Database       : myblog

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2016-11-08 20:20:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `author` varchar(20) DEFAULT NULL,
  `author_email` varchar(30) DEFAULT NULL,
  `author_ip` varchar(255) DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL,
  `support` int(11) DEFAULT '0' COMMENT '点赞数',
  `oppose` int(11) DEFAULT '0' COMMENT '不点赞数',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '该条评论创建时间',
  `post_id` bigint(20) DEFAULT NULL COMMENT '评论所属文章的id',
  `parent_id` bigint(11) DEFAULT '0' COMMENT '父级评论的id',
  `user_id` bigint(11) DEFAULT NULL COMMENT '评论者的id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES ('1', 'huoqishi', 'huoqishi@isc.net', '192.168.1.1', '小伙子写的不错哦！', null, '0', '0', '2016-10-08 19:28:27', '3', '0', '1');
INSERT INTO `comments` VALUES ('2', 'sinopia', 'sinopia@tt.net', '192.168.1.199', '哈哈哈哈，加油!', null, '0', '0', '2016-10-08 19:57:39', '3', '0', null);
INSERT INTO `comments` VALUES ('4', 'xiaoming', 'kk', '::ffff:127.0.0.1', '哈哈只', null, '0', '0', '2016-10-13 17:28:36', '4', '0', null);
INSERT INTO `comments` VALUES ('5', 'xiaoming', 'kk', '::ffff:127.0.0.1', '哈哈只', null, '0', '0', '2016-10-13 17:28:36', '4', '0', null);
INSERT INTO `comments` VALUES ('6', 'xiaoming', 'kk', '::ffff:127.0.0.1', '哈哈只', null, '0', '0', '2016-10-13 17:28:36', '4', '0', null);
INSERT INTO `comments` VALUES ('7', 'xiaoming', 'kk', '::ffff:127.0.0.1', '哈哈只', null, '0', '0', '2016-10-13 17:28:36', '4', '0', null);
INSERT INTO `comments` VALUES ('8', 'xiaoming', 'kk', '::ffff:127.0.0.1', '哈哈只', null, '0', '0', '2016-10-13 17:28:36', '4', '0', null);
INSERT INTO `comments` VALUES ('9', 'q', 'f', '::ffff:127.0.0.1', 'a', null, '0', '0', '2016-10-13 17:28:36', '4', '0', null);
INSERT INTO `comments` VALUES ('20', '123123', '2342', '::ffff:127.0.0.1', '234', null, '0', '0', '2016-10-14 19:49:52', '3', null, null);
INSERT INTO `comments` VALUES ('21', '123', '123', '::ffff:127.0.0.1', '123', null, '0', '0', '2016-10-14 19:58:37', '3', null, null);
INSERT INTO `comments` VALUES ('22', '123', '123', '::ffff:127.0.0.1', '123', null, '0', '0', '2016-10-14 19:59:47', '3', null, null);
INSERT INTO `comments` VALUES ('23', '123', '123', '::ffff:127.0.0.1', '123', null, '0', '0', '2016-10-14 19:59:53', '3', null, null);
INSERT INTO `comments` VALUES ('24', '23', '123123', '::ffff:127.0.0.1', '123', null, '0', '0', '2016-10-15 23:56:27', '3', null, null);
INSERT INTO `comments` VALUES ('25', '1', '3', '::ffff:127.0.0.1', '333', null, '0', '0', '2016-10-16 21:27:30', '3', null, null);
