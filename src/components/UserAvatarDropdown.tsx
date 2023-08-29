import defaultUserIcon from "../assets/icons/default-user.svg";

const UserAvatarDropdown = () => {
  return (
    <div>
        <div className="w-9">
            <img src={defaultUserIcon} alt="User avatar" className="w-full h-full"/>
        </div>
    </div>
  )
}

export default UserAvatarDropdown