import React from 'react'

const Footer = () => {
	return (
		<div className="footer">
			<p className="col-sm" style={{fontSize: "12px"}}>
              &copy;{new Date().getFullYear()} My Calendar App | All rights reserved |
              Terms Of Service | Privacy 
            </p>
		</div>
	)
}

export default Footer