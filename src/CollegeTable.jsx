import React, { useState, useEffect, useRef } from "react";

// Sample Dummy Data
const initialColleges = [
  {
    id: 1,
    name: "College A",
    rating: 4.5,
    fees: 50000,
    userReview: 4.0,
    featured: true,
  },
  {
    id: 2,
    name: "College B",
    rating: 4.2,
    fees: 45000,
    userReview: 3.8,
    featured: false,
  },
  {
    id: 3,
    name: "College C",
    rating: 4.2,
    fees: 45000,
    userReview: 3.8,
    featured: false,
  },
  {
    id: 4,
    name: "College D",
    rating: 4.2,
    fees: 45000,
    userReview: 3.8,
    featured: false,
  },
  {
    id: 5,
    name: "College E",
    rating: 4.2,
    fees: 45000,
    userReview: 3.8,
    featured: false,
  },
  {
    id: 6,
    name: "College F",
    rating: 4.2,
    fees: 45000,
    userReview: 3.8,
    featured: false,
  },
  {
    id: 7,
    name: "College G",
    rating: 4.2,
    fees: 45000,
    userReview: 3.8,
    featured: false,
  },
  {
    id: 8,
    name: "College H",
    rating: 4.2,
    fees: 45000,
    userReview: 3.8,
    featured: false,
  },
  {
    id: 9,
    name: "College I",
    rating: 4.2,
    fees: 45000,
    userReview: 3.8,
    featured: false,
  },
  {
    id: 10,
    name: "College J",
    rating: 4.2,
    fees: 45000,
    userReview: 3.8,
    featured: false,
  },
  {
    id: 11,
    name: "College K",
    rating: 4.2,
    fees: 45000,
    userReview: 3.8,
    featured: false,
  },
  {
    id: 12,
    name: "College L",
    rating: 4.2,
    fees: 45000,
    userReview: 3.8,
    featured: false,
  },
  {
    id: 13,
    name: "College M",
    rating: 4.2,
    fees: 45000,
    userReview: 3.8,
    featured: false,
  },
  // Add more colleges...
];

const CollegeTable = () => {
  const [colleges, setColleges] = useState(initialColleges);
  const [visibleColleges, setVisibleColleges] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "rating",
    direction: "ascending",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);
  useEffect(() => {
    // Load the initial 10 colleges
    setVisibleColleges(colleges.slice(0, 10));
  }, [colleges]);

  const loadMoreColleges = () => {
    if (visibleColleges.length >= colleges.length) {
      setHasMore(false);
      return;
    }
    const nextColleges = colleges.slice(
      visibleColleges.length,
      visibleColleges.length + 10
    );
    setVisibleColleges((prev) => [...prev, ...nextColleges]);
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";
    setSortConfig({ key, direction });
    setColleges((prevColleges) =>
      [...prevColleges].sort((a, b) => {
        if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
        if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
        return 0;
      })
    );
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredColleges = visibleColleges.filter((college) =>
    college.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      loadMoreColleges();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [visibleColleges]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by college name..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <div className="table"
      ref={containerRef}
      >
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>College Name</th>
              <th onClick={() => handleSort("rating")}>Collegedunia Rating</th>
              <th onClick={() => handleSort("fees")}>Fees</th>
              <th onClick={() => handleSort("userReview")}>
                User Review Rating
              </th>
              <th>Featured</th>
            </tr>
          </thead>
          <tbody>
            {filteredColleges.map((college) => (
              <tr key={college.id}>
                <td>{college.name}</td>
                <td>{college.rating}</td>
                <td>{college.fees}</td>
                <td>{college.userReview}</td>
                <td>{college.featured ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!hasMore && <p>No more colleges to display</p>}
      </div>
    </div>
  );
};

export default CollegeTable;
