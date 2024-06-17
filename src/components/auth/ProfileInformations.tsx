import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const formatInitials = (name: string | null | undefined) => {
  // Vérifiez si name existe et n'est pas juste une chaîne de caractères vide
  if (!name || name.trim().length === 0) {
    return '';
  }

  // Utilisez une expression régulière pour diviser name sur les espaces et les underscores
  return name
    .split(/[\s_]+/)
    .map(nom => nom[0] ? nom[0].toUpperCase() : '')
    .join('');
};

const ProfileInformations = () => {
  const user = {
    username: 'John Doe',
    image: "https://img.lemde.fr/2017/09/14/78/0/530/530/700/0/75/0/b1cc6f0_11665-1ccfe6c.e9jduqh0k9.jpg"
  }; // Simulate user data

  return (

    <div className="flex flex-shrink-0 items-center space-x-4">
      <div className="flex flex-shrink-0 items-center space-x-4">
        <div className="flex flex-col items-end ">
          <Avatar>
            <AvatarImage src={user?.image} />
            <AvatarFallback>{formatInitials(user?.username)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformations;
