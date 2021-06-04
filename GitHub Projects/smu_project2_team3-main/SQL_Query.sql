-- Bring back all columns
SELECT *
FROM headlines;

SELECT *
FROM sources;

SELECT *
FROM category;

-- Join Category and Headline Table
SELECT
	c.category_name,
	COUNT(*) AS frequency
FROM 
	headlines h
	JOIN category c 
	ON h.category_id = c.category_id
GROUP BY 
	c.category_name
ORDER BY 
	frequency DESC;

-- Join all tables / Find specific articles
SELECT
	h.article_id,
	h.article_name,
	s.source_name,
	c.category_name
FROM 
	headlines h
	JOIN category c ON h.category_id = c.category_id
	JOIN sources s ON h.source_id = s.source_id
WHERE 
	s.source_name = 'The Guardian' AND c.category_name = 'Business';

-- The 'ol Trump Lookup
SELECT
	h.article_id,
	h.article_name,
	c.category_name,
	s.source_name
FROM 
	headlines h
	JOIN category c ON h.category_id = c.category_id
	JOIN sources s ON h.source_id = s.source_id
WHERE 
	h.article_name LIKE '%rump%'