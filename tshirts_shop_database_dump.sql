-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Июн 10 2021 г., 17:50
-- Версия сервера: 8.0.13-4
-- Версия PHP: 7.2.24-0ubuntu0.18.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `EGTjWL7tfJ`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Cart`
--

CREATE TABLE `Cart` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `tshirtOptions_id` int(10) NOT NULL,
  `quantity` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `Cart`
--

INSERT INTO `Cart` (`id`, `user_id`, `tshirtOptions_id`, `quantity`) VALUES
(45, 24, 38, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `Categories`
--

CREATE TABLE `Categories` (
  `id` int(10) NOT NULL,
  `value` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `Categories`
--

INSERT INTO `Categories` (`id`, `value`) VALUES
(1, 'Bicycle'),
(2, 'IT'),
(3, 'Humour'),
(4, 'Music'),
(5, 'Celebration'),
(6, 'Jokes');

-- --------------------------------------------------------

--
-- Структура таблицы `Color`
--

CREATE TABLE `Color` (
  `id` int(10) NOT NULL,
  `value` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `Color`
--

INSERT INTO `Color` (`id`, `value`) VALUES
(1, 'indianred'),
(2, 'orangered'),
(3, 'rebeccapurple'),
(4, 'lawngreen'),
(5, 'royalblue'),
(6, 'darkgoldenrod'),
(7, 'gainsboro'),
(8, 'floralwhite');

-- --------------------------------------------------------

--
-- Структура таблицы `Delivery`
--

CREATE TABLE `Delivery` (
  `id` int(10) NOT NULL,
  `value` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `Delivery`
--

INSERT INTO `Delivery` (`id`, `value`) VALUES
(1, 'Nova Poshta'),
(2, 'Mist Express'),
(3, 'Kiki\'s Delivery Service');

-- --------------------------------------------------------

--
-- Структура таблицы `Material`
--

CREATE TABLE `Material` (
  `id` int(10) NOT NULL,
  `value` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `Material`
--

INSERT INTO `Material` (`id`, `value`) VALUES
(1, '100% cotton'),
(2, '90% cotton, 10% polyester'),
(3, '95% cotton, 5% artificial silk');

-- --------------------------------------------------------

--
-- Структура таблицы `Orders`
--

CREATE TABLE `Orders` (
  `id` int(10) NOT NULL,
  `date` timestamp NOT NULL,
  `user_id` int(10) NOT NULL,
  `tshirtsList` json NOT NULL,
  `payments_id` int(10) NOT NULL,
  `status_id` int(10) NOT NULL,
  `delivery_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `Orders`
--

INSERT INTO `Orders` (`id`, `date`, `user_id`, `tshirtsList`, `payments_id`, `status_id`, `delivery_id`) VALUES
(17, '2021-06-10 17:23:16', 24, '[{\"quantity\": 5, \"tshirtOptionsId\": 17}, {\"quantity\": 1, \"tshirtOptionsId\": 46}, {\"quantity\": 2, \"tshirtOptionsId\": 66}]', 1, 3, 3),
(18, '2021-06-10 17:25:02', 24, '[{\"quantity\": 1, \"tshirtOptionsId\": 12}]', 3, 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `Payments`
--

CREATE TABLE `Payments` (
  `id` int(10) NOT NULL,
  `value` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `Payments`
--

INSERT INTO `Payments` (`id`, `value`) VALUES
(1, 'Cash'),
(2, 'Visa/Mastercard'),
(3, 'Privat24');

-- --------------------------------------------------------

--
-- Структура таблицы `Size`
--

CREATE TABLE `Size` (
  `id` int(10) NOT NULL,
  `value` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `Size`
--

INSERT INTO `Size` (`id`, `value`) VALUES
(1, 'xs'),
(2, 's'),
(3, 'm'),
(4, 'l'),
(5, 'xl'),
(6, 'xxl');

-- --------------------------------------------------------

--
-- Структура таблицы `Status`
--

CREATE TABLE `Status` (
  `id` int(10) NOT NULL,
  `value` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `Status`
--

INSERT INTO `Status` (`id`, `value`) VALUES
(1, 'ordered'),
(2, 'shipped'),
(3, 'delivered'),
(4, 'cancelled');

-- --------------------------------------------------------

--
-- Структура таблицы `Tshirt`
--

CREATE TABLE `Tshirt` (
  `id` int(10) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `price` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `type_id` int(10) NOT NULL,
  `material_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `Tshirt`
--

INSERT INTO `Tshirt` (`id`, `name`, `price`, `type_id`, `material_id`) VALUES
(1, 'Asteroid Blues', '15', 1, 1),
(2, 'Gateway Shuffle', '10', 1, 2),
(3, 'Heavy Metal Queen', '13', 1, 3),
(4, 'Waltz for Venus', '13', 2, 1),
(5, 'Ganymede Elegy', '10', 2, 1),
(6, 'Jupiter Jazz', '8', 2, 3),
(7, 'Black Dog Serenade', '9', 3, 1),
(8, 'Boogie Woogie Feng Shui', '8', 3, 1),
(9, 'Cowboy Funk', '9', 3, 2),
(10, 'The Real Folk Blues', '15', 4, 1),
(11, 'Hard Luck Woman', '16', 4, 2),
(12, 'Mushroom Samba', '16', 4, 2),
(13, 'Wild Horses', '10', 5, 3),
(14, 'Bohemian Rhapsody', '12', 5, 2),
(15, 'My Funny Valentine', '11', 6, 1),
(16, 'Sympathy for the Devil', '12', 6, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `TshirtCategories`
--

CREATE TABLE `TshirtCategories` (
  `id` int(10) NOT NULL,
  `tshirt_id` int(10) NOT NULL,
  `category_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- Дамп данных таблицы `TshirtCategories`
--

INSERT INTO `TshirtCategories` (`id`, `tshirt_id`, `category_id`) VALUES
(1, 1, 4),
(2, 2, 4),
(3, 2, 1),
(4, 3, 2),
(5, 4, 4),
(6, 5, 3),
(7, 6, 2),
(8, 7, 3),
(9, 7, 4),
(10, 8, 5),
(11, 9, 1),
(12, 10, 1),
(13, 16, 6),
(14, 10, 3),
(15, 11, 2),
(16, 12, 4),
(17, 13, 4),
(18, 13, 5),
(19, 14, 3),
(20, 14, 5),
(21, 15, 3),
(22, 15, 4);

-- --------------------------------------------------------

--
-- Структура таблицы `TshirtOptions`
--

CREATE TABLE `TshirtOptions` (
  `id` int(10) NOT NULL,
  `tshirt_id` int(10) NOT NULL,
  `color_id` int(10) NOT NULL,
  `size_id` int(10) NOT NULL,
  `quantity` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `TshirtOptions`
--

INSERT INTO `TshirtOptions` (`id`, `tshirt_id`, `color_id`, `size_id`, `quantity`) VALUES
(7, 1, 1, 2, 10),
(8, 1, 1, 3, 30),
(9, 1, 2, 2, 32),
(10, 1, 2, 3, 3),
(11, 1, 4, 2, 1),
(12, 1, 4, 3, 0),
(13, 2, 2, 2, 14),
(14, 2, 2, 3, 24),
(15, 2, 2, 4, 3),
(16, 2, 4, 2, 15),
(17, 2, 4, 3, 11),
(18, 2, 4, 4, 2),
(19, 3, 5, 2, 11),
(20, 3, 6, 2, 12),
(21, 3, 5, 3, 1),
(22, 3, 6, 3, 4),
(23, 4, 4, 2, 12),
(24, 4, 4, 3, 21),
(25, 4, 4, 4, 11),
(26, 4, 5, 2, 2),
(27, 4, 5, 3, 121),
(28, 4, 5, 4, 22),
(29, 4, 7, 2, 31),
(30, 4, 7, 3, 0),
(31, 4, 7, 4, 12),
(32, 5, 1, 1, 33),
(33, 5, 1, 2, 23),
(34, 5, 2, 1, 32),
(35, 5, 2, 2, 12),
(36, 6, 7, 1, 44),
(37, 6, 7, 2, 42),
(38, 6, 8, 1, 24),
(39, 6, 8, 2, 0),
(40, 7, 1, 1, 1),
(41, 7, 1, 2, 1),
(42, 8, 8, 5, 11),
(43, 8, 8, 4, 22),
(44, 9, 8, 5, 22),
(45, 9, 8, 6, 11),
(46, 10, 1, 2, 22),
(47, 10, 1, 3, 31),
(48, 11, 2, 2, 22),
(49, 11, 2, 3, 31),
(50, 12, 1, 4, 14),
(51, 12, 1, 5, 13),
(52, 12, 1, 6, 11),
(53, 13, 2, 1, 11),
(54, 13, 2, 2, 32),
(55, 14, 6, 4, 1),
(56, 14, 5, 4, 2),
(57, 15, 7, 2, 23),
(58, 15, 6, 2, 11),
(59, 16, 5, 3, 33),
(60, 16, 5, 4, 21),
(61, 16, 6, 3, 22),
(62, 16, 6, 4, 2),
(63, 16, 7, 3, 2),
(64, 16, 7, 4, 25),
(65, 16, 8, 3, 0),
(66, 16, 8, 4, 2),
(67, 16, 1, 3, 1),
(68, 16, 1, 4, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `Type`
--

CREATE TABLE `Type` (
  `id` int(10) NOT NULL,
  `value` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `Type`
--

INSERT INTO `Type` (`id`, `value`) VALUES
(1, 'man'),
(2, 'woman'),
(3, 'child'),
(4, 'long'),
(5, 'uni'),
(6, 'ringer');

-- --------------------------------------------------------

--
-- Структура таблицы `Users`
--

CREATE TABLE `Users` (
  `id` int(10) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `passwd` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `Users`
--

INSERT INTO `Users` (`id`, `name`, `phone`, `email`, `passwd`) VALUES
(24, 'User', '0987654321', 'user@example.com', '$2a$12$M286VBzbGYqU/cG8EN88bOgecWRtrGKzUns.wUE91gRxhroQnb1rq');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Cart`
--
ALTER TABLE `Cart`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Color`
--
ALTER TABLE `Color`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Delivery`
--
ALTER TABLE `Delivery`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Material`
--
ALTER TABLE `Material`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Payments`
--
ALTER TABLE `Payments`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Size`
--
ALTER TABLE `Size`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Status`
--
ALTER TABLE `Status`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Tshirt`
--
ALTER TABLE `Tshirt`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `TshirtCategories`
--
ALTER TABLE `TshirtCategories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `TshirtOptions`
--
ALTER TABLE `TshirtOptions`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Type`
--
ALTER TABLE `Type`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Cart`
--
ALTER TABLE `Cart`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT для таблицы `Categories`
--
ALTER TABLE `Categories`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `Color`
--
ALTER TABLE `Color`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `Delivery`
--
ALTER TABLE `Delivery`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `Material`
--
ALTER TABLE `Material`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `Orders`
--
ALTER TABLE `Orders`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT для таблицы `Payments`
--
ALTER TABLE `Payments`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `Size`
--
ALTER TABLE `Size`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `Status`
--
ALTER TABLE `Status`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `Tshirt`
--
ALTER TABLE `Tshirt`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `TshirtCategories`
--
ALTER TABLE `TshirtCategories`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT для таблицы `TshirtOptions`
--
ALTER TABLE `TshirtOptions`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT для таблицы `Type`
--
ALTER TABLE `Type`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
