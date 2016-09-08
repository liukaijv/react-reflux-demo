import React from 'react';
import Base from '../base';
import {Link} from 'react-router';

export default class Sidebar extends Base {

	render(){
		return (
				<aside className="main-sidebar">
					<section className="sidebar">
						<ul className="sidebar-menu">							
							<li>					          
					          <Link to="index">
					            <i className="fa fa-dashboard"></i> <span>首页</span>
					          </Link>					         
					        </li>
					        <li className="treeview">
					          <a href="#">
					            <i className="fa fa-sitemap"></i> <span>分类</span> <i className="fa fa-angle-left pull-right"></i>
					          </a>
					          <ul className="treeview-menu">
					            <li>
					            	<Link to="category/index"><i className="fa fa-circle-o"></i> 分类列表</Link>
					            </li>
					            <li>
					            	<Link to="category/create"><i className="fa fa-circle-o"></i> 分类新增</Link>
					            </li>
					          </ul>
					        </li>
					        <li className="treeview">
					          <a href="#">
					            <i className="fa fa-book"></i> <span>文章</span> <i className="fa fa-angle-left pull-right"></i>
					          </a>
					          <ul className="treeview-menu">
					            <li>
					            	<Link to="post/index"><i className="fa fa-circle-o"></i> 文章列表</Link>
					            </li>
					            <li>
					            	<Link to="post/create"><i className="fa fa-circle-o"></i> 文章新增</Link>
					            </li>
					          </ul>
					        </li>
					        <li className="treeview">
					          <a href="#">
					            <i className="fa fa-tag"></i> <span>标签</span> <i className="fa fa-angle-left pull-right"></i>
					          </a>
					          <ul className="treeview-menu">
					            <li>
					            	<Link to="tag/index"><i className="fa fa-circle-o"></i> 标签列表</Link>
					            </li>
					            <li>
					            	<Link to="tag/create"><i className="fa fa-circle-o"></i> 标签新增</Link>
					            </li>
					          </ul>
					        </li>
						</ul>
					</section>
				</aside>
			);
	}

}