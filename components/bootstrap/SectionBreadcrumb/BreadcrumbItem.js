import Link from 'next/link';

const BreadcrumbItem = ({ active, href, text, ...props }) => {
    if(active){
        return (
            <li className="breadcrumb-item active">{text}</li>
        );
    } else {
        if(href != null){
            return (
                <li className="breadcrumb-item"><Link href={href}><a>{text}</a></Link></li>
            );
        } else {
            return (
                <li className="breadcrumb-item">{text}</li>
            );
        }
    }
}

export default BreadcrumbItem;