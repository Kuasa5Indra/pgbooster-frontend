import Image from "next/image";

const EmptyState = () => {
    return (
        <div className="text-center">
            <Image src="/assets/img/no-data.svg" alt="no-data" width={100} height={100} />
            <h5>We couldn't find any data</h5>
        </div>
    );
}

export default EmptyState;