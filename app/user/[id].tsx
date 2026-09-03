import { useLocalSearchParams } from 'expo-router';

import { UserDetailsScreen } from '@/screens/user-details/user-details-screen';

export default function UserRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <UserDetailsScreen id={id} />;
}
