import { getAllMediaById } from '@/actions/media/mediaAction';
import { useAppSelector } from '@/redux/hook';
import { QueryClient } from '@tanstack/react-query';
import React from 'react';

type Props = {
    children: React.ReactNode;
};

const QueryLayout = ({ children }: Props) => {
    const { currentAdmin } = useAppSelector((state) => state.admin);

    const query = new QueryClient();

    query.prefetchQuery({
        queryKey:["get-media"],
        queryFn:()=>getAllMediaById(currentAdmin?._id ?? "")
    })

 

    return <div>{children}</div>;
};

export default QueryLayout;
