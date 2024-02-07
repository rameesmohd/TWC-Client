import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
// import { setMobileViewMenuToggler } from '../../Redux/AdminAuth'
import { Button, message, Popconfirm } from 'antd';
import {logout} from '../../Redux/AdminSclice'
import {PoweroffOutlined} from '@ant-design/icons'


const Sidebar = () => {
const location = useLocation()
const navigate = useNavigate()
const dispatch = useDispatch()
// const mobileView = useSelector((store)=>store.Admin.mobileView)

let mobileView = true;
const confirm = (e) => {
	console.log(e);
	dispatch(logout())
	navigate('/twc/admin/login')
};

const cancel = (e) => {
	
};

return (
<>
<div className="flex flex-col items-center h-screen fixed z-50">
	{/* component sm */}
	<div onClick={'()=>dispatch(setMobileViewMenuToggler(!mobileView))'} className={` flex-col items-center w-16 transition h-full ${mobileView ? "" : '-translate-x-full'} overflow-hidden text-gray-400 bg-gray-900  md:hidden`}>
			<div className="flex flex-col items-center mt-3 border-t border-gray-700">
			<Link to={'/twc/admin/sales'} className={`${location.pathname === '/admin/sales' ? 'bg-gray-700' : ''} flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300`} href="#">
				<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
				</svg>
			</Link>
			<Link to={'/twc/admin/users'} className={`${location.pathname === '/admin/users' ? 'bg-gray-700' : ''} flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300`} href="#">
				<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			</Link>
			{/* <Link to={'/twc/admin/courses'} className={`${location.pathname === '/admin/courses' ? 'bg-gray-700' : ''} flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300`} href="#">
				<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
				</svg>
			</Link> */}
		</div>
	</div>

	{/* component md*/}
	<div className=" flex-col justify-between items-center w-40 h-full overflow-hidden text-gray-400 bg-black hidden md:block">
        <p className='text-center p-2'>TWC ADMIN</p>
			<div className="w-full flex flex-col justify-between h-full pb-10 px-2">
			<div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
				<Link className={`flex items-center w-full h-12 px-3 mt-2 rounded ${location.pathname === '/twc/admin/sales' ? 'bg-gray-700 text-gray-300' : ''} 
					hover:bg-gray-700 hover:text-gray-300`} to={'/twc/admin/sales'} >
					<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
					</svg>
					<span className="ml-2 text-sm font-medium">Sales</span>
				</Link>
				<Link className={`flex items-center w-full h-12 px-3 mt-2 rounded ${location.pathname === '/twc/admin/users' ? 'bg-gray-700 text-gray-300' : ''} 
					hover:bg-gray-700 hover:text-gray-300`} to={'/twc/admin/users'}>
					<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
					<span className="ml-2 text-sm font-medium" >Users</span>
				</Link>
		
				{/* <Link to={'/twc/admin/course'} className={`flex items-center w-full h-12 px-3 mt-2 rounded ${location.pathname === '/twc/admin/course' ? 'bg-gray-700 text-gray-300' : ''} 
					hover:bg-gray-700 hover:text-gray-300`} >
					<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
					</svg>
					<span className="ml-2 text-sm font-medium">Course</span>
				</Link> */}
			</div>
			<Popconfirm
				title="Logout"
				description="Are you sure to logout?"
				onConfirm={confirm}
				onCancel={cancel}
				okButtonProps={{ style: { backgroundColor: 'blue', color: 'white' } }}
				okText={'Yes'}
				style={{backgroundColor :'red'}}
				cancelText="No"
			>
				<button className={`flex items-center w-full h-12 px-3 mt-2 rounded} 
				hover:bg-gray-700 hover:text-gray-300`} >
				<PoweroffOutlined style={{ color: 'white' }} />
				<span className="ml-2 text-sm font-medium">Logout</span>
				</button>

			</Popconfirm>
			</div>
		</div>
	</div>
</>
)
}

export default Sidebar