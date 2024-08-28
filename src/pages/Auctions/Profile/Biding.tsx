import { FC } from 'react'
import { useQuery } from 'react-query'
import authStore from 'stores/auth.store'
import * as API from 'api/Api'
import ItemCard from 'components/item/ItemCard'


const Bidding:FC = () => {
    const currentUserId = authStore.user?.id
    
    const { data, isLoading } = useQuery(
        ['userBids'],
        () => API.userBids(currentUserId || ''),
        {
            keepPreviousData: true,
            refetchOnWindowFocus: false,
        },
    )
    
    
    
    return (
        <div>
            {isLoading ? (
            <div>Laoding....</div>
        ) : (
            <>
                {data?.data.lenght === 0 ? (
                    <div className='container-fluid h-75 d-flex justify-content-center align-items-center'>
                    <div className="row">
                        <div className="col-mb-6">
                            <h4 className='fw-bold'>Oh no, no auctions yet!</h4>
                            <p className='text-secondary text-center'>
                                <small>
                                    To add a new auction clikc + button in <br />
                                    navigation bar or wait for other users <br />
                                    to add new auctions
                                </small>
                            </p>
                        </div>
                    </div>
                </div>
                ) : (
                    <>
                        <div className="d-flex flex-wrap gap-4 justify-content-center">
                            {data?.data.map((bid:any, index: number) => (
                                <div key={index}>
                                    <ItemCard item={bid.item}/>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </>
        )}

        </div>
    )
}

export default Bidding