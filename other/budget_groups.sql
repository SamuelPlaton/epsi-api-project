-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 10 mars 2021 à 14:23
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `budget_groups`
--

-- --------------------------------------------------------

--
-- Structure de la table `groups`
--

DROP TABLE IF EXISTS `groups`;
CREATE TABLE IF NOT EXISTS `groups` (
  `id` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(450) NOT NULL,
  `budget` double NOT NULL,
  `code` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `groups`
--

INSERT INTO `groups` (`id`, `title`, `description`, `budget`, `code`) VALUES
('6c00dc5e-fe1e-4123-b811-fcfdb1f0a8bb', 'Vacances Mars 2021', 'Budget commun pour les vacances de mars', 300, '209102'),
('6cd0cf40-a999-4c7e-ac02-f8653b7c3806', 'Courses pour ce week-end', 'Groupe pour aller faire les courses ce week-end', 60, '876394'),
('f4acd4e2-e722-4f7f-a872-5ce467ef6676', 'Restaurant Février 2021', 'Budget pour aller au restaurant en février', 80, '822929');

-- --------------------------------------------------------

--
-- Structure de la table `users_groups`
--

DROP TABLE IF EXISTS `users_groups`;
CREATE TABLE IF NOT EXISTS `users_groups` (
  `id` varchar(50) NOT NULL,
  `user` varchar(50) DEFAULT NULL,
  `money` double DEFAULT NULL,
  `role` enum('guest','admin') DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  `group` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_group_group_idx` (`group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users_groups`
--

INSERT INTO `users_groups` (`id`, `user`, `money`, `role`, `token`, `group`) VALUES
('4bb36e5b-db37-48dc-8f3a-344ef741d30e', '71624ca2-30fb-455a-862b-a507c1bde51e', 0, 'guest', 'U2FsdGVkX19ZdJFr3bj1kqQx/g6zDWWP3F9GJnwmkX4=', '6cd0cf40-a999-4c7e-ac02-f8653b7c3806'),
('4c438cb6-a0ab-421c-8f86-cddea4511d55', '383502e5-c287-4d78-8dc3-1d928db97046', 0, 'guest', 'U2FsdGVkX18TlCEVOFkfFNsbH1t6mU8eOe2/EzuWoBE=', 'f4acd4e2-e722-4f7f-a872-5ce467ef6676'),
('64d6c4e7-3396-4b91-9b8e-47a00b4369c4', '62f7a905-1518-4447-9072-4eb66e6d9cd3', 0, 'admin', 'U2FsdGVkX19vf7xK1r/YKlkuKaAJMbe67jQdEL/7N0c=', 'f4acd4e2-e722-4f7f-a872-5ce467ef6676'),
('997d51e7-1626-4ce6-99ca-952c9f5467e7', '383502e5-c287-4d78-8dc3-1d928db97046', 0, 'guest', 'U2FsdGVkX18TlCEVOFkfFNsbH1t6mU8eOe2/EzuWoBE=', '6c00dc5e-fe1e-4123-b811-fcfdb1f0a8bb'),
('a9860982-eb5a-44fd-b7e5-3ad6890e4018', '62f7a905-1518-4447-9072-4eb66e6d9cd3', 50, 'guest', 'U2FsdGVkX19vf7xK1r/YKlkuKaAJMbe67jQdEL/7N0c=', '6c00dc5e-fe1e-4123-b811-fcfdb1f0a8bb'),
('ab13715e-5d6e-4a74-99be-7556fac8a4e4', '71624ca2-30fb-455a-862b-a507c1bde51e', 100, 'admin', 'U2FsdGVkX19ZdJFr3bj1kqQx/g6zDWWP3F9GJnwmkX4=', '6c00dc5e-fe1e-4123-b811-fcfdb1f0a8bb'),
('b99f7677-e6f4-4a0d-b3a6-f6bcb6cf35f1', '383502e5-c287-4d78-8dc3-1d928db97046', 0, 'admin', 'U2FsdGVkX18TlCEVOFkfFNsbH1t6mU8eOe2/EzuWoBE=', '6cd0cf40-a999-4c7e-ac02-f8653b7c3806');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `users_groups`
--
ALTER TABLE `users_groups`
  ADD CONSTRAINT `fk_user_group_group` FOREIGN KEY (`group`) REFERENCES `groups` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
