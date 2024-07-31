
CREATE TABLE movies (
  id SERIAL PRIMARY KEY, title VARCHAR (50) UNIQUE NOT NULL, description text,year VARCHAR (55), duration VARCHAR(20) NOT NULL,rating REAL);

  INSERT INTO movies(title, description, year, duration, rating) VALUES ('Avatar', 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.','18 Dec 2009','162 mins',9.4),

  INSERT INTO movies(title, description, year, duration, rating) VALUES ('Alone', 'A recently widowed traveler is kidnapped by a cold-blooded killer, only to escape into the wilderness, where she is forced to battle against the elements as her pursuer closes in on her.','18 Sep 2020','98 mins',6.2),
  ('Life', 'A team of scientists aboard the International Space Station discover a rapidly evolving life form that caused extinction on Mars and now threatens all life on Earth.','10 Sep 2017','104 mins',6.4),
  ('The Pursuit of Happiness', 'A college student goes to prison for vehicular manslaughter and unpaid tickets. He escapes with his girlfriend, becoming fugitives. The narrative explores the sustainability and consequences of their life on the run','11 Sep 2010','104 mins',8.4);