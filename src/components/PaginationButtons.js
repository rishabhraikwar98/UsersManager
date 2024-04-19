import React from 'react';
import { Button } from 'react-bootstrap';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div style={{justifyContent:"center",display:"flex"}}>
    <div style={{display:"flex",justifyContent:"space-evenly"}}>
      <Button
        variant="primary"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='mx-5 my-3'
      >
        Prev
      </Button>
      <Button className='mx-5 my-3' variant='primary'>{currentPage}</Button>
      <Button
       className='mx-5 my-3'
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
