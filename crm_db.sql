-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 27, 2025 at 04:30 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crm_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `blog_id` int(11) NOT NULL,
  `admin_type` int(11) DEFAULT NULL,
  `blog_title` varchar(500) DEFAULT NULL,
  `blog_desc` longtext DEFAULT NULL,
  `slugs` varchar(100) DEFAULT NULL,
  `meta_title` varchar(100) DEFAULT NULL,
  `meta_keywords` varchar(100) DEFAULT NULL,
  `meta_desc` varchar(500) DEFAULT NULL,
  `tags` varchar(100) DEFAULT NULL,
  `blog_img` varchar(100) DEFAULT NULL,
  `alt_txt` varchar(100) DEFAULT NULL,
  `is_deleted` int(11) NOT NULL DEFAULT 0,
  `deleted_at` timestamp NULL DEFAULT current_timestamp(),
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `blogs`
--
DELIMITER $$
CREATE TRIGGER `before_update` BEFORE UPDATE ON `blogs` FOR EACH ROW SET NEW.updated_at = NOW()
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `blog_categories`
--

CREATE TABLE `blog_categories` (
  `bid` int(11) NOT NULL,
  `blog_id` int(11) DEFAULT NULL,
  `cat_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `cat_id` int(11) NOT NULL,
  `admin_type` int(11) DEFAULT NULL,
  `cat_name` varchar(100) DEFAULT NULL,
  `cat_slugs` varchar(100) DEFAULT NULL,
  `meta_title` varchar(100) NOT NULL,
  `meta_desc` mediumtext DEFAULT NULL,
  `meta_keys` varchar(500) DEFAULT NULL,
  `tags` varchar(100) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cms`
--

CREATE TABLE `cms` (
  `cm_id` int(11) NOT NULL,
  `cms_name` varchar(100) DEFAULT NULL,
  `cms_content` longtext DEFAULT NULL,
  `meta_title` varchar(500) DEFAULT NULL,
  `meta_keywords` varchar(500) DEFAULT NULL,
  `meta_desc` mediumtext DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `destination`
--

CREATE TABLE `destination` (
  `d_id` int(11) NOT NULL,
  `admin_type` int(11) DEFAULT NULL,
  `dname` varchar(100) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `meta_title` varchar(500) DEFAULT NULL,
  `meta_keywords` varchar(500) DEFAULT NULL,
  `meta_desc` mediumtext DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `fid` int(11) NOT NULL COMMENT ' ',
  `blog_id` int(11) DEFAULT NULL,
  `p_id` int(11) DEFAULT NULL,
  `cat_id` int(11) NOT NULL,
  `admin_type` int(11) DEFAULT NULL,
  `faq_que` varchar(500) DEFAULT NULL,
  `faq_ans` mediumtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` tinyint(4) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `mid` int(11) NOT NULL,
  `media_name` varchar(100) DEFAULT NULL,
  `image_path` varchar(100) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `upload_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `p_id` int(11) NOT NULL,
  `admin_type` int(11) DEFAULT NULL,
  `cat_id` int(11) DEFAULT NULL,
  `page_name` varchar(100) DEFAULT NULL,
  `page_slugs` varchar(100) DEFAULT NULL,
  `page_img` varchar(100) DEFAULT NULL,
  `alt_txt` varchar(100) DEFAULT NULL,
  `url_name` varchar(100) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `meta_title` varchar(100) DEFAULT NULL,
  `meta_key` varchar(100) DEFAULT NULL,
  `meta_desc` mediumtext DEFAULT NULL,
  `is_deleted` int(11) NOT NULL DEFAULT 0,
  `deleted_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

CREATE TABLE `setting` (
  `s_id` int(11) NOT NULL,
  `back_site_logo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subcategory`
--

CREATE TABLE `subcategory` (
  `subcat_id` int(11) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `subcat_name` varchar(100) DEFAULT NULL,
  `subcat_slugs` varchar(100) DEFAULT NULL,
  `content` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subcategory`
--

INSERT INTO `subcategory` (`subcat_id`, `cat_id`, `subcat_name`, `subcat_slugs`, `content`) VALUES
(1, 4, 'emirates cancellation policys', 'emirates-cancellation-policys', '<p>Is it not fair to explore multiple destinations in one single trip? If yes, then Qatar Airways Multi-city is the option for you. Hub Airport at Hamad International Airport, Doha, is the national flag carrier of Qatar. It was founded in 1993 and operates flights in 90 countries including 11 in the United States.</p>\n\n<p>&nbsp;</p>\n\n<p>This article is a comprehensive guide that tells you all about Qatar Airways multi-city options, How to book multi-city flights on Qatar Airways, benefits, etc. So read the article below to explore things together.</p>\n\n<h2>Qatar Airways Multi-city Flights</h2>\n\n<p>As the name &lsquo;multi-city&rsquo; suggests, it allows you to stop at multiple locations with multiple flights. And, the more surprising thing is that all this exploration is available to you on a single trip. This means, that instead of taking just a roundway trip, you can extend your flights to multiple cities at a price comparatively lower than one way or round trip. Isn&rsquo;t it awesome?</p>\n\n<p>If&nbsp;<a href=\"\\\">Qatar Airways</a> fascinates you, book the Multi-city Flights with incredible stopover packages. It serves more than 170 destinations in and around the world.</p>\n\n<h3>How Can I Book Multi-city Flights on Qatar Airways?</h3>\n\n<p>Qatar Airways allows going through a seamless booking process through their website, Apps, and phone. Choose the platform that you find most convenient for you. Here is the complete booking process you can refer to.</p>\n\n<h4>Through Website</h4>\n\n<p><strong>Plan Your Itinerary:</strong> A good journey starts with planning. Therefore, you must keep your information before booking a flight on Qatar Airways.</p>\n\n<p><strong>Search for Flight:</strong> Choose the flight that best fits your travel plan. Follow the below steps to search for flights on their official website.</p>\n\n<ul>\n	<li>Visit Qatar Airways Homepage at https://www.qatarairways.com/en-us/homepage.html</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<ul>\n	<li>Click on &lsquo;Book a Flight&rsquo; under the &lsquo;Book &amp; Manage&rsquo; Tab.</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<ul>\n	<li>Select the Multi-City Option and choose your boarding, destination, departure date, class, and passengers such as the number of adults, children, and infants.</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<ul>\n	<li>Add the number of flights you want to add to your itineraries by clicking on &lsquo;Add Flight&rsquo;.</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<ul>\n	<li>Enter the Promo Code if applicable, and click the Search Flights button.</li>\n</ul>\n\n<p><strong>Customize your Booking:</strong> Customization is the key to the booking process. You can customize your itineraries as per your preferences. Follow the below steps.</p>\n\n<ul>\n	<li>Choose your flights one by one for each destination.</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<ul>\n	<li>Choose the fare option &ndash; Best-fare or Unrestricted-fare, that suits you best.</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<ul>\n	<li>Review your flights and click on continue.</li>\n</ul>\n\n<p><strong>Fill in Passenger Details:</strong> It is believed that the correct details make a journey perfect. So, fill in the particulars correctly.</p>\n\n<p><strong>Review &amp; Pay:</strong> It is the final step in the booking process. Here are the steps you can follow before proceeding to the payment.</p>\n\n<ul>\n	<li>Review your details such as your Legal Name, Date of Birth, Travel Date, Boarding and arrival airport, Flight details, etc.</li>\n	<li>&nbsp;</li>\n	<li>Check if any exclusive offer or coupon applies to your booking before proceeding to the payment.<br />\n	Pay the required fee and Submit.</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<ul>\n	<li>Congratulations! You are done. They will send you an e-mail containing all your flight-related details.</li>\n</ul>\n\n<h4>Through App</h4>\n\n<p>Qatar Airways provides you with an interactive booking process through their App. You can book your ticket most easily. It is not the only benefit that is available on the Qatar Airways App. But you are provided with unparalleled travel experience at your fingertips, for example regular updates, a digital boarding pass, and a privilege club card anytime.</p>\n\n<h3>How cheap are Multi-city flights at Qatar Airways ?</h3>\n\n<p>Multi-city flights are always considered more cost-effective and budget-friendly than one-way trips, or round trips. When you lump your destinations in one go, it saves your hard-earned money in your pocket.</p>\n\n<p>At Qatar Airways, you get the best deal with excellent customer service. The stunning destinations at multiple locations, incredible air travel service, unmatched discounts and offers, coupons, and promo codes &ndash; these are the things that make your multi-city flight cheaper at Qatar Airways. Sources suggest that December &ndash; the end of the year is the most economical month for flights at Qatar Airways.</p>\n\n<h3>Advantages of booking Multi-city flights on Qatar Airways</h3>\n\n<p>Qatar Airways is a proud member of the One World Alliance. It is honored as the World&rsquo;s Best Business Class at the 2023 World Airline Awards by Skytrax. Therefore, it offers the fliers a lot of benefits to make their flight an unforgettable experience for them. Here is the list of some key benefits of booking a flight on Qatar Airways.</p>\n\n<p>&nbsp;</p>\n\n<ul>\n	<li><strong>Value for Money:</strong>&nbsp;Along with the world-class air travel services they offer you huge discounts and promotions. You can check out their 48-hour sales available on the website and earn benefits with those.</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<ul>\n	<li><strong>Excess Baggage Discount:</strong>&nbsp;It offers you a discount of 50% on your excess baggage cost on direct booking. Moreover, you get a chance to save up to 70% on the pre-purchase of additional baggage in bulk on Qatar Airways.</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<ul>\n	<li><strong>No Modification Charges:</strong>&nbsp;In case you are supposed to do some modification in your booking, you will be able to do it free of charge.</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<ul>\n	<li><strong>Expert Travel Advice:</strong>&nbsp;Ask an expert when you are lacking in travel ideas. They are not just limited to flights only. You can book hotels, rental cars, and others through their collaborative partners.</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<ul>\n	<li><strong>Services on Request:</strong>&nbsp;You can request some special service or assistance in terms of meals, Lounge, or other valid services. They have a wide range of world-class service and they would love to cater to you.</li>\n</ul>\n\n<h4>Conclusion</h4>\n\n<p>Qatar Airways gained a name for providing best-in-class Multi-city flights and a seamless booking process. You can check in for your flights with their online check-in facility open only 24 hours before your departure. It saves you from the boredom of the long queue at the airport.</p>\n\n<p>The Qatar Airways app is designed for you to manage your booking and make your travel convenient. It enables you to stay up to date with the important travel moments and take full control of your flight. In certain circumstances, if you find kinds of stuff annoying for you, speak to Qatar Airways. You can ask for help by phone number and they will be happy to assist you.</p>\n'),
(2, 4, 'hawaiian airlines cancellation policy', 'hawaiian-airlines-cancellation-policy', '<p>American Airlines is the largest airline in terms of scheduled passengers and the total number of destinations. Do you want to explore America&rsquo;s top cities? Then you can always go for American Airlines. Regardless of your ticket class and destination, the airline always provides a premium flying experience. Traveling with multiple passengers, groups, or a family can always be interesting to enjoy the vacation. Now, you don&rsquo;t need to book your cities separately, as American Airlines has launched multi-city booking options. In this, all the places are covered in one separate itinerary. Whether you want to visit one country or a combination of cities, you can have a look at the complete guide on American Airlines multi-city flights and easily manage the reservation.</p>\n\n<h2>How to book a multi-city flight on American Airlines\\</h2>\n\n<p>Booking the multi-city flight can be completed easily through the online or offline modes. You can go through the simple information below to access the multiple reservations for your destination.</p>\n\n<ul>\n	<li><strong>Online method:</strong></li>\n</ul>\n\n<p>You can book the flight ticket in the easiest and fastest way to acquire the reservation. Let&rsquo;s follow the online process for American Airlines multi-destination flights according to your preferences.</p>\n\n<ul>\n	<li><strong>Offline method:</strong></li>\n</ul>\n\n<p>Apart from the online way, you can also talk to the customer service team and get assistance for the reservation. For this, you can call the American Airlines multi-city reservation phone number at 800-433-7300 and follow the IVR commands. When you choose the preferred command, your phone will be transferred to the experts to convey your booking requirements and get the multi-city flights.</p>\n\n<ul>\n	<li><strong>Navigate to the website:</strong></li>\n</ul>\n\n<p>One of the first and foremost steps is to open the official website of American Airlines at www.aa.com.</p>\n\n<ul>\n	<li><strong>Select the multi-city tab:</strong></li>\n</ul>\n\n<p>You are requested to add the trip type as &ldquo;multi-city&rdquo; when you proceed further with the reservation. Although, you must enter the number of passengers for the journey.</p>\n\n<ul>\n	<li><strong>Insert the list of destinations:</strong></li>\n</ul>\n\n<p>Add the cities you want to visit in the single booking, along with the departure and arrival travel dates for each destination.</p>\n\n<ul>\n	<li><strong>Choose the preferred flights:</strong></li>\n</ul>\n\n<p>When you tap on the search button, the website will show you the available list of flights to cover multiple destinations. Choose the preferred flight that best suits you as per the scheduled departure and other requirements.</p>\n\n<ul>\n	<li><strong>Make payment:</strong></li>\n</ul>\n\n<p>After selecting the flights, add the correct passenger information and travel documents and make the payment. Passengers can follow the on-screen instructions to complete the process.</p>\n\n<ul>\n	<li><strong>Get the confirmation:</strong></li>\n</ul>\n\n<p>When you complete the payment, American Airlines will share the confirmation email and the&nbsp;<a href=\"https://www.aa.com/booking/find-flights?fromMetaSearch=true&amp;bookingPathStateId=1484012047220-252&amp;isAvailabilityError=true&amp;site_preference=normal&amp;locale=en_US\">multi-city ticket</a>&nbsp;with you.</p>\n\n<h3>Benefits of Booking American Airlines multi-city flights:</h3>\n\n<ul>\n	<li><strong>Most convenient:</strong></li>\n</ul>\n\n<p>Without the burden of making individual flight reservations, it is simple to design complicated itineraries involving several locations. It makes travel arrangements simple and flexible.</p>\n\n<ul>\n	<li><strong>Saves the cost:</strong></li>\n</ul>\n\n<p>Multi-city flights can be the most cost-effective than the other individual bookings for your destination. Therefore, you can make the reservation at the lowest price possible and get the booking.</p>\n\n<ul>\n	<li><strong>Saves the time:</strong></li>\n</ul>\n\n<p>As you know, reserving separate flights and waiting for the layovers can be time-consuming. But multi-city flights save your time and cover all the destinations.</p>\n\n<ul>\n	<li><strong>More flexibility:</strong></li>\n</ul>\n\n<p>American Airlines allows you to customize your preferences and schedule adequate time for the multiple cities of each destination.</p>\n\n<ul>\n	<li><strong>Single booking:</strong></li>\n</ul>\n\n<p>Passengers who make the booking can manage multiple flights easily under one booking reference number, like check-in cancellations and changes for a smooth journey.</p>\n\n<h3>What are the popular American airline&rsquo;s multi-city stops in the US?</h3>\n\n<p>In addition to being a significant and expansive destination, the United States has several great regions that are well worth seeing. If you are planning to visit on a short trip, AA multi-city will be the best one for you. One can explore the various travel locations in the US as follows.</p>\n\n<ul>\n	<li>Los Angeles &ndash; Chicago-New York</li>\n	<li>Los Angeles &ndash; San Diego- San Jose</li>\n	<li>New Orleans- Atlanta-Nashville</li>\n	<li>Omaha-Colorado Springs-Oklahoma city</li>\n</ul>\n\n<h3>Do American Airlines do multi-city flights?</h3>\n\n<p>Yes, American Airlines provides multi-city flight tickets to several destinations or stops. Passengers will have the option to visit multiple cities in a single itinerary to acquire convenience for business travelers and passengers with diverse plans. One can book an</p>\n\n<p>American Airlines multi-destination trip to optimize the itinerary and save time compared to other single reservations.</p>\n\n<h3>What is the best way to book multi-city flights?</h3>\n\n<p>There are multiple ways available to book a flight ticket for a suitable destination. But one of the best ways to search for multi-city flights is online to get a reservation. For this, you can check the below steps to book the tickets.</p>\n\n<ul>\n	<li>Firstly, you must open the AA official website on your web page.</li>\n	<li>After this, you can choose the multi-city as a trip type to get the booking.</li>\n	<li>insert the departure and arrival destination with dates for one journey.</li>\n	<li>You must enter the number of passengers and the same information for the second journey as above.</li>\n	<li>You can add up to four destinations and search for the flights.</li>\n	<li>From that, you can choose a suitable flight and pay the required amount.</li>\n	<li>Get the multi-city booking confirmation message at your registered email ID about the new e-ticket.</li>\n</ul>\n\n<h4>Conclusion:</h4>\n\n<p>Booking your dream destination at the appropriate prices can always be the best approach. Don&rsquo;t waste time and get the American Airlines multi-city flights deals now to explore the various locations. Whether you are planning a leisure&nbsp;<a href=\"https://www.flyfaresky.com/blog/american-airlines-group-travel/\">adventure trip</a>, heading in a group, or attending a business meet-up, the multiple cities option will definitely simplify your process for a seamless travel experience.</p>\n');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `email_verified_at` varchar(10) NOT NULL,
  `utype` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `mobile` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `email_verified_at`, `utype`, `password`, `created_at`, `updated_at`, `mobile`) VALUES
(1, 'shobhnath', 'I2a', 'shobhnath.s@i2a.co', '0', 'USR', '$2b$10$KEek7bvIEPQm6kD.OrHTXef4zSRl1WL2B.r6pl2TTiZc1uODwrr52', '2025-08-27 13:47:16', '2025-08-27 13:47:16', '9918990731'),
(2, 'test', 'I2a', 'test.s@i2a.co', '0', 'USR', '$2b$10$ShoX0PhZZd2JoCTh.blEB.CBsn0Qagne8YaiKY7qAacsF/qqPS0kG', '2025-08-27 14:15:41', '2025-08-27 14:15:41', '9918990731');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`blog_id`);

--
-- Indexes for table `blog_categories`
--
ALTER TABLE `blog_categories`
  ADD PRIMARY KEY (`bid`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indexes for table `cms`
--
ALTER TABLE `cms`
  ADD PRIMARY KEY (`cm_id`);

--
-- Indexes for table `destination`
--
ALTER TABLE `destination`
  ADD PRIMARY KEY (`d_id`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`fid`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`mid`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`p_id`);

--
-- Indexes for table `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`s_id`);

--
-- Indexes for table `subcategory`
--
ALTER TABLE `subcategory`
  ADD PRIMARY KEY (`subcat_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `blog_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog_categories`
--
ALTER TABLE `blog_categories`
  MODIFY `bid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cms`
--
ALTER TABLE `cms`
  MODIFY `cm_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `destination`
--
ALTER TABLE `destination`
  MODIFY `d_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `fid` int(11) NOT NULL AUTO_INCREMENT COMMENT ' ';

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `setting`
--
ALTER TABLE `setting`
  MODIFY `s_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subcategory`
--
ALTER TABLE `subcategory`
  MODIFY `subcat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
