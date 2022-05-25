mongo xflix --eval "dropDatabase()"
mongoimport --host localhost --db xflix --collection videos --file ./backend/data/data.json