// import React, { useState } from 'react';
// import '../styles/Categories.css';

// function Categories()   {
//   const categories = ["Clothes", "Shoes", "Artwork", "Electronics", "Books"];
//   const [activeCategory, setActiveCategory] = useState(null);

//   const handleCategoryClick = (category) => {
//     setActiveCategory(category);
//   };

//   return (
//     <div>
//       <div className="categories-container">
//         {categories.map((category, index) => (
//           <div
//             key={index}
//             className={`category-item ${activeCategory === category ? 'active' : ''}`}
//             onClick={() => handleCategoryClick(category)}
//           >
//             {category} <span className="dropdown-icon">▼</span>
//           </div>
//         ))}
//       </div>

//       {/* This will display content based on the active category */}
//       <div className="category-content">
//         {activeCategory && (
//           <div>
//             <h2>{activeCategory}</h2>
//             <p>This is the content for {activeCategory}.</p>
//             {/* You can replace the paragraph with specific content for each category */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

