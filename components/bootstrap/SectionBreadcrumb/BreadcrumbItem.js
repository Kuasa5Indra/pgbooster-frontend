import Link from 'next/link';

const BreadcrumbItem = ({ active, href, text, ...props}) => {
    if(active){
        return (
            <div className="breadcrumb-item active"><Link href={href}><a>{text}</a></Link></div>
        );
    } else {
        return (
            <div className="breadcrumb-item">{text}</div>
        );
    }
}
 
export default BreadcrumbItem;