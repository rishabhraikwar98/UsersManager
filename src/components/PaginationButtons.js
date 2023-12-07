import React from 'react';
import { Pagination, Button } from 'react-bootstrap';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div style={{justifyContent:"center",display:"flex", marginTop:30}}>
    <div style={{display:"flex",justifyContent:"space-evenly", width:"20vw"}}>
      <Button 
        variant="primary"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </Button>
      <Button variant='primary'>{currentPage}</Button>
      <Button
        variant="primary"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
    </div>
  );
};

export default PaginationComponent;
