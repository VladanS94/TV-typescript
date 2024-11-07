export const toggleMenu = (setActiveMenuItem: React.Dispatch<React.SetStateAction<boolean>>) => {
  setActiveMenuItem((prevState) => !prevState); 
};