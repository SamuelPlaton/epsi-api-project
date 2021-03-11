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
-- Base de données :  `budget_users`
--

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `token` varchar(100) NOT NULL,
  `register_date` datetime NOT NULL DEFAULT sysdate(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `token`, `register_date`) VALUES
('383502e5-c287-4d78-8dc3-1d928db97046', 'Julie', 'Doe', 'julie.doe@mail.com', 'U2FsdGVkX18TlCEVOFkfFNsbH1t6mU8eOe2/EzuWoBE=', '2021-03-10 15:20:28'),
('62f7a905-1518-4447-9072-4eb66e6d9cd3', 'Eric', 'Doe', 'eric.doe@mail.com', 'U2FsdGVkX19vf7xK1r/YKlkuKaAJMbe67jQdEL/7N0c=', '2021-03-10 15:18:35'),
('71624ca2-30fb-455a-862b-a507c1bde51e', 'John', 'Doe', 'john.doe@mail.com', 'U2FsdGVkX19ZdJFr3bj1kqQx/g6zDWWP3F9GJnwmkX4=', '2021-03-10 15:16:59');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
