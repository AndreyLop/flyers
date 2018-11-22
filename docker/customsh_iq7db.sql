-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Хост: customsh.mysql.ukraine.com.ua
-- Время создания: Ноя 05 2018 г., 08:36
-- Версия сервера: 5.7.16-10-log
-- Версия PHP: 7.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `customsh_iq7`
--

-- --------------------------------------------------------

--
-- Структура таблицы `distribution`
--

CREATE TABLE `distribution` (
  `distribution_id` int(11) NOT NULL,
  `region_id` int(11) NOT NULL,
  `distribution` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(8,2) NOT NULL DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `distribution`
--

INSERT INTO `distribution` (`distribution_id`, `region_id`, `distribution`, `email`, `price`) VALUES
(1, 1, 'Alexandr', 'info@smarto.com.ua', '10.00'),
(2, 1, 'Alexi Polenur', 'alexi@polenur.com', '15.00'),
(3, 1, 'Andrey', 'lopatin601@gmail.com', '10.00'),
(4, 1, 'Vitaliy', 'vitaliyzell@gmail.com', '10.00'),
(5, 2, 'distribution 2-1', 'alexi@polenur.com', '10.00'),
(6, 2, 'distribution 2-2', 'alexi@polenur.com', '20.00'),
(7, 2, 'distribution 2-3', 'alexi@polenur.com', '10.00'),
(8, 2, 'distribution 2-4', 'alexi@polenur.com', '10.00'),
(9, 3, 'distribution 1', 'alexi@polenur.com', '10.00'),
(10, 1, 'distribution 5', 'alexi@polenur.com', '15.00');

-- --------------------------------------------------------

--
-- Структура таблицы `emailCampaign`
--

CREATE TABLE `emailCampaign` (
  `id` int(11) NOT NULL,
  `flyer_id` int(11) NOT NULL,
  `campaign_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `campaign_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `campaign_subject` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `campaign_send` tinyint(1) NOT NULL DEFAULT '1',
  `campaign_send_date` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `campaign_price` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `campaign_list` text COLLATE utf8mb4_unicode_ci,
  `sent_date` datetime DEFAULT NULL,
  `sent` mediumint(6) NOT NULL DEFAULT '0',
  `opened` mediumint(6) NOT NULL DEFAULT '0',
  `clicks` mediumint(6) NOT NULL DEFAULT '0',
  `status` int(3) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `emailStatistic`
--

CREATE TABLE `emailStatistic` (
  `id` int(11) NOT NULL,
  `id_campaign` int(11) DEFAULT NULL,
  `recipient` varchar(200) DEFAULT NULL,
  `timestamp` varchar(610) DEFAULT NULL,
  `event` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `errorsSender`
--

CREATE TABLE `errorsSender` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `campaign_id` int(11) NOT NULL,
  `error` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `flyerReports`
--

CREATE TABLE `flyerReports` (
  `id` int(11) NOT NULL,
  `report_id` int(11) NOT NULL,
  `flyer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `flyers`
--

CREATE TABLE `flyers` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `template_id` int(11) NOT NULL,
  `flyer_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `flyer_create` datetime DEFAULT CURRENT_TIMESTAMP,
  `flyer_update` datetime DEFAULT NULL,
  `flyer_preview` varchar(255) DEFAULT NULL,
  `flyer_photo` text,
  `flyer_photo_transform` text,
  `flyer_status` tinyint(4) NOT NULL DEFAULT '2' COMMENT '0 - удален 1 - заполнен 2 -черновик',
  `property_info` text,
  `extra_info` text,
  `realtor_info` text,
  `company_info` text,
  `flyer_error` mediumtext,
  `realtor_error` int(2) NOT NULL DEFAULT '0',
  `company_error` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `flyerTemplate`
--

CREATE TABLE `flyerTemplate` (
  `id` int(11) NOT NULL,
  `template_name` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `template_photo` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `template_photo_prop` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `template_properties` text COLLATE utf8mb4_unicode_ci,
  `template_inputs` json DEFAULT NULL,
  `template_active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `flyerTemplate`
--

INSERT INTO `flyerTemplate` (`id`, `template_name`, `template_photo`, `template_photo_prop`, `template_properties`, `template_inputs`, `template_active`) VALUES
(3, 'Flyer template Test', 'flyer1.png', 'flyer2_prop.png', 'a:5:{i:0;s:0:\"\";i:1;s:0:\"\";i:2;s:0:\"\";i:3;s:0:\"\";i:4;s:0:\"\";}', '{\"extra_info\": {\"content\": 500, \"headline\": 100}, \"company_info\": {\"zip\": 5, \"city\": 20, \"companyFax\": 15, \"companyName\": 40, \"addressLine1\": 30, \"addressLine2\": 30, \"companyPhone\": 15}, \"realtor_info\": {\"realtorName\": 20, \"realtorEmail\": 20, \"realtorPhone\": 15, \"realtorSlogan\": 50, \"realtorWebsite\": 30}, \"property_info\": {\"zip\": 5, \"city\": 20, \"price\": 10, \"website\": 30, \"mlsNumber\": 10, \"addressLine1\": 20, \"addressLine2\": 20}}', 1),
(4, 'Flyer template 2', 'flyer1.png', 'flyer2_prop.png', 'a:5:{i:0;s:0:\"\";i:1;s:0:\"\";i:2;s:0:\"\";i:3;s:0:\"\";i:4;s:0:\"\";}', '{\"extra_info\": {\"content\": 500, \"headline\": 100}, \"company_info\": {\"zip\": 5, \"city\": 20, \"companyFax\": 15, \"companyName\": 40, \"addressLine1\": 30, \"addressLine2\": 30, \"companyPhone\": 15}, \"realtor_info\": {\"realtorName\": 20, \"realtorEmail\": 20, \"realtorPhone\": 15, \"realtorSlogan\": 50, \"realtorWebsite\": 30}, \"property_info\": {\"zip\": 5, \"city\": 20, \"price\": 10, \"website\": 30, \"mlsNumber\": 10, \"addressLine1\": 20, \"addressLine2\": 20}}', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `forgotPassword`
--

CREATE TABLE `forgotPassword` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `data_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_end` datetime NOT NULL,
  `temp_key` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `payment_method_id` int(11) NOT NULL DEFAULT '1',
  `campaign_id` int(11) NOT NULL,
  `payment_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `payment` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_transaction` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_status` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `region`
--

CREATE TABLE `region` (
  `id` int(11) NOT NULL,
  `state_id` int(11) NOT NULL,
  `region_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `region`
--

INSERT INTO `region` (`id`, `state_id`, `region_name`) VALUES
(1, 1, 'region 1'),
(2, 1, 'region 2'),
(3, 2, 'region 3');

-- --------------------------------------------------------

--
-- Структура таблицы `session`
--

CREATE TABLE `session` (
  `session_id` int(11) NOT NULL,
  `session_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `session_ip` varchar(15) DEFAULT NULL,
  `user_email` varchar(50) DEFAULT NULL,
  `session_devicy` text,
  `session_result` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `state`
--

CREATE TABLE `state` (
  `id` int(11) NOT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `state`
--

INSERT INTO `state` (`id`, `state`, `code`) VALUES
(1, 'California', 'CA'),
(2, 'Texas', 'TX'),
(3, 'Florida', 'FL'),
(4, 'New York', 'NY'),
(5, 'Pennsylvania', 'PA'),
(6, 'Illinois', 'IL'),
(7, 'Ohio', 'OH'),
(8, 'Georgia', 'GA'),
(9, 'North Carolina', 'NC'),
(10, 'Michigan', 'MI'),
(11, 'New Jersey', 'NJ'),
(12, 'Virginia', 'VA'),
(13, 'Washington', 'WA'),
(14, 'Arizona', 'AZ'),
(15, 'Massachusetts', 'MA'),
(16, 'Tennessee', 'TN'),
(17, 'Indiana', 'IN'),
(18, 'Missouri', 'MO'),
(19, 'Maryland', 'MD'),
(20, 'Wisconsin', 'WI'),
(21, 'Colorado', 'CO'),
(22, 'Minnesota', 'MN'),
(23, 'South Carolina', 'SC'),
(24, 'Alabama', 'AL'),
(25, 'Louisiana', 'LA'),
(26, 'Kentucky', 'KY'),
(27, 'Oregon', 'OR'),
(28, 'Oklahoma', 'OK'),
(29, 'Connecticut', 'CT'),
(30, 'Iowa', 'IA'),
(31, 'Utah', 'UT'),
(32, 'Arkansas', 'AR'),
(33, 'Nevada', 'NV'),
(34, 'Mississippi', 'MS'),
(35, 'Kansas', 'KS'),
(36, 'New Mexico', 'NM'),
(37, 'Nebraska', 'NE'),
(38, 'West Virginia', 'WA'),
(39, 'Idaho', 'ID'),
(40, 'Hawaii', 'HI'),
(41, 'New Hampshire', 'NH'),
(42, 'Maine', 'ME'),
(43, 'Rhode Island', 'RI'),
(44, 'Montana', 'MT'),
(45, 'Delaware', 'DE'),
(46, 'South Dakota', 'SD'),
(47, 'North Dakota', 'ND'),
(48, 'Alaska', 'AK'),
(49, 'Vermont', 'VT'),
(50, 'Wyoming', 'WY');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_first_name` varchar(100) DEFAULT NULL,
  `user_last_name` text,
  `user_pass` varchar(255) DEFAULT NULL,
  `user_email` varchar(50) DEFAULT NULL,
  `user_phone` varchar(20) DEFAULT NULL,
  `user_photo` varchar(255) DEFAULT NULL,
  `user_registered` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_last_update` datetime DEFAULT NULL,
  `user_active` tinyint(1) DEFAULT '1',
  `website` varchar(255) DEFAULT NULL,
  `slogan` varchar(500) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `company_logo` varchar(255) DEFAULT NULL,
  `company_phone` varchar(30) DEFAULT NULL,
  `company_fax` varchar(30) DEFAULT NULL,
  `company_adress1` varchar(255) DEFAULT NULL,
  `company_adress2` varchar(255) DEFAULT NULL,
  `company_city` varchar(255) DEFAULT NULL,
  `company_code` varchar(50) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `user_typ` tinyint(1) NOT NULL DEFAULT '0',
  `token` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `distribution`
--
ALTER TABLE `distribution`
  ADD PRIMARY KEY (`distribution_id`);

--
-- Индексы таблицы `emailCampaign`
--
ALTER TABLE `emailCampaign`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `emailStatistic`
--
ALTER TABLE `emailStatistic`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `errorsSender`
--
ALTER TABLE `errorsSender`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `flyerReports`
--
ALTER TABLE `flyerReports`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `flyers`
--
ALTER TABLE `flyers`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `flyerTemplate`
--
ALTER TABLE `flyerTemplate`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `forgotPassword`
--
ALTER TABLE `forgotPassword`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `region`
--
ALTER TABLE `region`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`session_id`);

--
-- Индексы таблицы `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `distribution`
--
ALTER TABLE `distribution`
  MODIFY `distribution_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `emailCampaign`
--
ALTER TABLE `emailCampaign`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `emailStatistic`
--
ALTER TABLE `emailStatistic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `errorsSender`
--
ALTER TABLE `errorsSender`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `flyerReports`
--
ALTER TABLE `flyerReports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `flyers`
--
ALTER TABLE `flyers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `flyerTemplate`
--
ALTER TABLE `flyerTemplate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `forgotPassword`
--
ALTER TABLE `forgotPassword`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `region`
--
ALTER TABLE `region`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `session`
--
ALTER TABLE `session`
  MODIFY `session_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `state`
--
ALTER TABLE `state`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
