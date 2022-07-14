import { useRouter } from 'next/router'

function Profile() {
  const router = useRouter();
  const username = router.query.username;
  //console.log(router);
  return (
    <div>
      <h2>You&apos;re viewing the profile of {username}</h2>
    </div>
  )
}

Profile.minRole = '*';

export default Profile;

