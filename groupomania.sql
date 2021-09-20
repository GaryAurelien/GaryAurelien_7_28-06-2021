-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 20 sep. 2021 à 09:08
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `test3`
--

-- --------------------------------------------------------

--
-- Structure de la table `commentaires`
--

DROP TABLE IF EXISTS `commentaires`;
CREATE TABLE IF NOT EXISTS `commentaires` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `date_création` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_commentaires_users1_idx` (`user_id`),
  KEY `fk_commentaires_posts1_idx` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commentaires`
--

INSERT INTO `commentaires` (`id`, `content`, `date_création`, `user_id`, `post_id`) VALUES
(1, 'yes i can ^^', '2021-09-08 10:26:20', 38, 91),
(2, 'D\'accord, je suis.', '2021-09-08 10:29:07', 39, 92),
(3, 'Mon précieux... ??', '2021-09-14 10:42:04', 40, 92),
(4, 'Mon précieux...?', '2021-09-14 10:42:12', 40, 91),
(5, 'je suis l\'intrus ...', '2021-09-14 10:52:42', 41, 93),
(6, 'je suis l\'intrus ...', '2021-09-14 10:52:46', 41, 92),
(7, 'je suis l\'intrus ...', '2021-09-14 10:52:52', 41, 91),
(11, 'je suis l\'intrus n°2 ...', '2021-09-14 11:01:22', 43, 93),
(12, 'je suis l\'intrus n°2 ...', '2021-09-14 11:01:25', 43, 92),
(13, 'je suis l\'intrus n°2 ...', '2021-09-14 11:01:29', 43, 91);

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `date_création` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_posts_users1_idx` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `titre`, `imageUrl`, `content`, `date_création`, `user_id`) VALUES
(91, '', 'http://localhost:3000/images/yoda_post.jpg1631089502159.jpg', '« Le côté obscur de la Force, redouter tu dois. »', '2021-09-08 10:25:02', 39),
(92, '', 'http://localhost:3000/images/obama_travail.jpg1631089695744.jpg', '« Si vous marchez sur le droit chemin et que vous êtes prêts à y rester, alors vous êtes peut être en train de progresser »', '2021-09-08 10:28:15', 38),
(93, '', 'http://localhost:3000/images/anneau-plaque-or-mon-precieux.jpeg1631608887222.jpg', 'Mon Précieux… Ils me l’ont volé ! Sales petits hobbits joufflus !', '2021-09-14 10:41:27', 40);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `profilPic` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `name` (`name`),
  KEY `firstname` (`firstname`),
  KEY `profilPic` (`profilPic`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `profilPic`, `email`, `password`, `name`, `firstname`, `position`, `admin`) VALUES
(1, 'http://localhost:3000/profilPic/icon.png1631180733533.png', 'AdminGroupomania@Groupomania.com', '$2b$10$1CnxmOK/EnwaLQtgNP/xleXKKrODRH3tyCMNDM.KsM61tIzt6wHEW', 'Mr', 'Zeus', 'Admin', 1),
(38, 'http://localhost:3000/profilPic/barack-obama.jpg1631088991487.jpg', 'obama@gmail.com', '$2b$10$ySJVW0UI.V9UNQUjk5kL/.vURw8ut0AFZQLPeI0g80/EdW.NVuXIa', 'Obama', 'Barack', 'sage', 0),
(39, 'http://localhost:3000/profilPic/3892f92_PJ401_FILM-STARWARS-ALIENLIFE_1207_11.jfif1631535151555.jpg', 'yoda@gmail.com', '$2b$10$EBSJ8loEUlKfyfzXmLWz4.gA023Ff9Da3l1b3/VlNiXTYB2N8Ic3W', 'Maitre', 'Yoda', 'Jedi', 0),
(40, 'http://localhost:3000/profilPic/gollum_profil.jfif1631608742041.jpg', 'Gollum@gmail.com', '$2b$10$tzRQ1iNOUHbkke9s/LmnQ..SOYcCi4Gomwa6JV8kYa.5IrPv4y/wu', 'Trahald', 'Smeagol', 'Gollum', 0),
(41, 'http://localhost:3000/profilPic/images_suppresion.jfif1631609539622.jpg', 'intrus@gmail.com', '$2b$10$P3RyfJrhZfT3hNGGPEUfQeITuXm1clDyqehXqHp8S/eYNgNm.ynz.', 'intrus', 'intrus', 'intrus', 0),
(43, 'http://localhost:3000/profilPic/images_suppresion.jfif1631610062354.jpg', 'intrus2@gmail.com', '$2b$10$qXalphqcrFeoLD9mIitW0.0lKPB1/JRgXWc53ikH3qEX4hJrCbW/G', 'intrus2', 'intrus2', 'intrus2', 0);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD CONSTRAINT `fk_commentaires_posts1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_commentaires_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_posts_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
