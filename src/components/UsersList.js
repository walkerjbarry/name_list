import UsersListItem from './UsersListItem';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUsers } from '../store';
import { addUser } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';
import { useThunk } from '../hooks/use-thunk';




function UsersList() {
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);
    const { data } = useSelector((state) => {
        return state.users;
     });


    useEffect(() => {
        doFetchUsers();
    }, [doFetchUsers]);

    const handleUserAdd = () => {
        doCreateUser();  
    };

    let content;
    if (isLoadingUsers) {
        content = <Skeleton times={6} className="h-10 w-full" />;
    }
    else if (loadingUsersError) {
        content = <div>Error fetching data...</div>;
    } else {
        content = data.map((user) => {
            return <UsersListItem key={user.id} user={user} />;      
        });
    }
 
    return(
    <div>
        <div className="flex flex-row justify-between items-center m-3">
            <h1 className="m-2 text-xl">Users</h1>
                <Button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" loading={isCreatingUser} onClick={handleUserAdd}>+ Add User</Button>
            {creatingUserError && 'Error Creating User'}
        </div>
        {content}
    </div>
)}

export default UsersList;