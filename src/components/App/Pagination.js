import React from 'react'
const paginationStyle = {
  // overflow: 'hidden'
}
const pageResultsStyle = {
  overflow: 'hidden'
}
const Pagination = (props) => {
  const pageLinks = []
  for (let i = 1; i <= props.pages + 1; i++) {
    const active = props.currentPage === i ? 'active' : ''
    pageLinks.push(<li className={`waves-effect ${active}`} key={i} onClick={() => props.nextPage(i)}><a href="#">{i}</a></li>)
  }
  return (
    <div className="container" style={pageResultsStyle}>
      <div className="row">
        <ul className="pagination" style={paginationStyle}>
          { props.currentPage > 1 ? <li className={'waves-effect'} onClick={() => props.nextPage(props.currentPage - 1)}><a href="#">Prev</a></li> : '' }
          { pageLinks }
          { props.currentPage < props.pages + 1 ? <li className={'waves-effect'} onClick={() => props.nextPage(props.currentPage + 1)}><a href="#">Next</a></li> : '' }
        </ul>
      </div>
    </div>
  )
}
export default Pagination
