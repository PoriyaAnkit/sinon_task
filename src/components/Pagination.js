import React from 'react'

export default function pagination ( { handlePrevious, currentPage, totalPages, handleNext }) {
  return (
      <div style={{ margin: '20px 0px', textAlign: 'right' }}>
          <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              style={{
                  marginRight: '10px',
                  padding: '5px 10px',
                  backgroundColor: "green",
                  color: "white",
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              }}
          >
              Previous
          </button>
          <span>
              Page {currentPage} of {totalPages}
          </span>
          <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              style={{
                  marginLeft: '10px',
                  padding: '5px 10px',
                  backgroundColor: "green",
                  color: "white",
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              }}
          >
              Next
          </button>
      </div>
  )
}
