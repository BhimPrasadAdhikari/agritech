// import ExpertGroup from "@/components/ExpertGroup"
import ExpertGroup from "@/components/ExpertGroup";
import prismadb from "@/lib/prismadb";

async function fetchExperts(){
  try {
    const experts = await prismadb.user.findMany({
      where: {
        role: 'EXPERT',
      },
      include: {
        image: true, 
      },
    });
    return experts ?? [];  // Return an empty array if experts is null
  } catch (error) {
    console.error("Expert_fetch error:", error);
    return [];  // Return an empty array on error
  }

}
const ExpertsPage = async() => {

const experts= await fetchExperts();
 
  return (
    <>
      
        <ExpertGroup experts={experts}/>
     
    </>
  );
};
export default ExpertsPage;
