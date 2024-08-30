import React, { useState, useEffect, useRef } from "react";
import collegeData from './collegeData.json';
// Sample Dummy Data

const CollegeTable = () => {
  const initialColleges = collegeData;
  // console.log(collegeData)
  const [colleges, setColleges] = useState(initialColleges);
  const [loading, setLoading] = useState(false)
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
      document.documentElement.offsetHeight
    ) {
      setLoading(true)
      // Set a 2-second delay before calling loadMoreColleges
      setTimeout(() => {
        loadMoreColleges();
        // setLoading(false)
      }, 2000);
      // loadMoreColleges();
    }
  };

  useEffect(() => {
    // const container = containerRef.current;
    // container.addEventListener("scroll", handleScroll);
    // return () => container.removeEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleColleges]);

  return (
    <div>
      <input
      class="textbox"
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
              <th onClick={() => handleSort("rank")}>Collegedunia Rating</th>
              <th onClick={() => handleSort("name")}>College Name</th>
              <th onClick={() => handleSort("fees")}>Fees</th>
              <th onClick={() => handleSort("placementAvg")}>Package</th>
              <th onClick={() => handleSort("userReview")}>
                User Review Rating
              </th>
              <th>Featured</th>
            </tr>
          </thead>
          <tbody>
            {filteredColleges.map((college,i) => (
              <tr key={i}>
              <td className="rank">{college.rank}</td>
              <td className="college-info">
                <div className="college-header">
                  <h4>{college.name}</h4>
                  <p>{college.location}</p>
                  <span>{college.course}</span> | <span>{college.cutoff}</span>
                </div>
                <div className="college-actions">
                  <button className="apply-btn">Apply Now</button>
                  <button className="brochure-btn">Download Brochure</button>
                  <label>
                    <input type="checkbox" /> Add To Compare
                  </label>
                  {college.featured && <span className="featured-badge">Featured</span>}
                </div>
              </td>
              <td className="fees">
                <div className="fee">{college.fees}</div>
                <a href="#compare-fees">Compare Fees</a>
              </td>
              <td className="placement">
                <div>Average Package</div>
                <div>{college.placementAvg}</div>
                <div>Highest Package</div>
                <div>{college.placementHigh}</div>
                <a href="#compare-placement">Compare Placement</a>
              </td>
              <td className="reviews">
                <div>{college.userReview}</div>
                <p>{college.reviewDetail}</p>
                <span className="badge">{college.badges[0]}</span>
              </td>
              <td className="ranking">
                <div>{college.ranking}</div>
                <div>{college.rankingYear}</div>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
        <div style={{
          width:'100%',
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          padding:"20px"
        }}>
        {loading && <div class="loader"></div>}
        </div>
        {!hasMore && <p>No more colleges to display</p>}
      </div>
    </div>
  );
};

export default CollegeTable;
