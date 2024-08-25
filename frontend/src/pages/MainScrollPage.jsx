import React, {useRef} from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import '../styles/MainScrollPage.css';
import { Card, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import activityImage from '../assets/mainScroll_activities.jpg';
import communityImage from '../assets/mainScroll_community.png';
import aboutUsImage from '../assets/mainScroll_aboutUs.jpg';
import zubinLogo from '../assets/mainScroll_zubinLogo.jpg';

const MainScrollPage = () => {

  const { Meta } = Card;
  const navigate = useNavigate();
  const eventsRef = useRef(null);
  const communityRef = useRef(null);
  const missionRef = useRef(null);
  
  const scrollToEvents = () => {
    if (eventsRef.current) {
      const offsetTop = eventsRef.current.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };
  const scrollToCommunity = () => {
    if (communityRef.current) {
      const offsetTop = communityRef.current.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };
  const scrollToMission = () => {
    if (missionRef.current) {
      const offsetTop = missionRef.current.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };


  return (
    <div style = {{overflow: "auto", display:"flex", flexDirection: "column"}}>
      <div
        style={{
          backgroundImage: "url(zubinHands.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "90vh", // Adjust height as needed
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "100px"
        }}
      >
        <div
            style = {{textAlign: "center", fontSize: "70px", fontWeight: "bold", backgroundColor: "white", color:"black", padding: "10px", paddingLeft: "20px", padingRight: "20px"}}
          > 𝐙𝐮𝐛𝐢𝐧 𝐅𝐨𝐮𝐧𝐝𝐚𝐭𝐢𝐨𝐧 
        </div>
        <Button
          style={{
            width: "200px", // Adjust width as needed
            height: "60px", // Adjust height as needed
            borderRadius: "0", // No rounded edges
            fontSize: "18px", // Adjust font size if needed
            fontWeight: "bold"
          }}
          ghost
          onClick={scrollToEvents}
        >
          𝐄𝐱𝐩𝐥𝐨𝐫𝐞
        </Button>
      </div>

      <div ref={eventsRef} style = {{display: "flex", justifyContent:"center", backgroundColor:"#f9ef1e"}}>
        <div
          style={{
            flex: 2,
            backgroundImage: "url(volunteer.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "95vh",
            clipPath: "polygon(0 0, 90% 0, 80% 100%, 0% 100%)",
            boxShadow: "inset -5px 0 0 0 black" 
          }}
        ></div>

        <div style={{flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"start"}}>
         
            <div style = {{fontSize: "60px", fontWeight: "bold", color: "black", marginBottom: "20px"}}>
              𝐔𝐩𝐜𝐨𝐦𝐢𝐧𝐠 𝐄𝐯𝐞𝐧𝐭𝐬
            </div>
            <div style = {{fontSize: "15px", color: "black", marginBottom: "120px", paddingRight: "50px"}}>
             𝐉𝐨𝐢𝐧 𝐮𝐬 𝐟𝐨𝐫 𝐭𝐡𝐞 "𝐅𝐚𝐦𝐢𝐥𝐲 𝐏𝐥𝐚𝐧𝐭-𝐀-𝐓𝐫𝐞𝐞" 𝐞𝐯𝐞𝐧𝐭 𝐨𝐧 𝐀𝐮𝐠𝐮𝐬𝐭 𝟖𝐭𝐡! 𝐄𝐧𝐣𝐨𝐲 𝐚 𝐟𝐮𝐧 𝐝𝐚𝐲 𝐨𝐮𝐭𝐝𝐨𝐨𝐫𝐬 𝐩𝐥𝐚𝐧𝐭𝐢𝐧𝐠 𝐭𝐫𝐞𝐞𝐬 𝐚𝐧𝐝 𝐛𝐨𝐧𝐝𝐢𝐧𝐠 𝐰𝐢𝐭𝐡 𝐲𝐨𝐮𝐫 𝐟𝐚𝐦𝐢𝐥𝐲 𝐰𝐡𝐢𝐥𝐞 𝐡𝐞𝐥𝐩𝐢𝐧𝐠 𝐭𝐡𝐞 𝐞𝐧𝐯𝐢𝐫𝐨𝐧𝐦𝐞𝐧𝐭.
            </div>
            <Button
              style={{
                width: "200px", // Adjust width as needed
                height: "60px", // Adjust height as needed
                borderRadius: "0", // No rounded edges
                fontSize: "18px", // Adjust font size if needed
                fontWeight: "bold",
                color: "black",
                borderColor: "black"
              }}
              ghost
              onClick={() => navigate('/event')}
            >
              𝐊𝐧𝐨𝐰 𝐦𝐨𝐫𝐞
            </Button>

            <div 
              onClick = {scrollToCommunity}
              style={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                width: '200px',
                height: '40px',
                cursor: 'pointer',
                fontSize: '20px',
                marginTop: "200px"
              }}  
            > {`▼`}
            </div>
            
        </div>
      </div>

      <div ref = {communityRef} style = {{display: "flex", justifyContent:"center", backgroundColor:"#e34234"}}>
        

        <div style={{flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"start"}}>
         
            <div style = {{fontSize: "60px", fontWeight: "bold", color: "black", marginBottom: "20px", paddingLeft: "50px"}}>
              𝐂𝐨𝐦𝐦𝐮𝐧𝐢𝐭𝐲 𝐒𝐮𝐩𝐩𝐨𝐫𝐭
            </div>
            
            <div style = {{fontSize: "15px", color: "black", marginBottom: "120px", paddingLeft: "50px"}}>
            𝐉𝐨𝐢𝐧 𝐨𝐮𝐫 𝐨𝐧𝐥𝐢𝐧𝐞 𝐟𝐨𝐫𝐮𝐦 𝐚𝐧𝐝 𝐚𝐜𝐜𝐞𝐬𝐬 𝐨𝐧𝐞-𝐨𝐧-𝐨𝐧𝐞 𝐜𝐨𝐧𝐬𝐮𝐥𝐭𝐢𝐧𝐠 𝐟𝐨𝐫 𝐦𝐞𝐧𝐭𝐚𝐥 𝐡𝐞𝐚𝐥𝐭𝐡 𝐬𝐮𝐩𝐩𝐨𝐫𝐭. 𝐂𝐨𝐧𝐧𝐞𝐜𝐭 𝐰𝐢𝐭𝐡 𝐨𝐭𝐡𝐞𝐫𝐬, 𝐬𝐡𝐚𝐫𝐞 𝐞𝐱𝐩𝐞𝐫𝐢𝐞𝐧𝐜𝐞𝐬, 𝐚𝐧𝐝 𝐫𝐞𝐜𝐞𝐢𝐯𝐞 𝐩𝐞𝐫𝐬𝐨𝐧𝐚𝐥𝐢𝐳𝐞𝐝 𝐠𝐮𝐢𝐝𝐚𝐧𝐜𝐞 𝐟𝐫𝐨𝐦 𝐩𝐫𝐨𝐟𝐞𝐬𝐬𝐢𝐨𝐧𝐚𝐥𝐬.
            </div>

            <div style = {{paddingLeft: "50px", height: "300px"}}>
              <Button
                style={{
                  width: "200px", // Adjust width as needed
                  height: "60px", // Adjust height as needed
                  borderRadius: "0", // No rounded edges
                  fontSize: "18px", // Adjust font size if needed
                  fontWeight: "bold",
                  color: "black",
                  borderColor: "black",

                }}
                ghost
                onClick={() => navigate('/community')}
              >
                𝐊𝐧𝐨𝐰 𝐦𝐨𝐫𝐞
              </Button>
              <div 
                onClick = {scrollToMission}
                style={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  width: '200px',
                  height: '40px',
                  cursor: 'pointer',
                  fontSize: '20px',
                  marginTop: "200px"
                }}  
              > {`▼`}
              </div>
            </div>
        </div>
        <div
          style={{
            flex: 2,
            backgroundImage: "url(community.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "90vh",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 10% 100%)",
            boxShadow: "inset -5px 0 0 0 black" 
          }}
        ></div>
      </div>

      <div ref = {missionRef} style = {{height: "90vh", background: "orange", display: "flex", flexDirection: "column", justifyContent:"center", alignItems: "center"}}>
          <div style={{ fontSize: "40px", width:"70%", fontWeight: "bold", textAlign:"center", paddingBottom: "50px", marginBottom: "50px", borderBottom: "2px solid #000", color: "black" }}>
            Our Mission
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <Card
              hoverable
              style={{
                width: 300,
                margin: '10px',
              }}
              cover={<img alt="example" src="/womanAndGirls.jpg" style={{ height: 200, objectFit: 'cover' }} />}
            >
              <Meta title="Women and Girls" description="We provide support, build women’s networks and empower women by upskilling them." />
            </Card>
            <Card
              hoverable
              style={{
                width: 300,
                margin: '10px',
              }}
              cover={<img alt="example" src="/opportunity.jpg" style={{ height: 200, objectFit: 'cover' }} />}
            >
              <Meta title="Opportunities" description="Ethnic minority youth face numerous challenges in accessing tertiary education and job opportunities. " />
            </Card>
            <Card
              hoverable
              style={{
                width: 300,
                margin: '10px',
              }}
              cover={<img alt="example" src="/family.jpg" style={{ height: 200, objectFit: 'cover' }} />}
            >
              <Meta title="Families" description="Large family sizes, language barriers, and limited access to education often make it challenging for ethnic minority families." />
            </Card>
          </div>

        
      </div>

      <footer>
        <div className="footer-bottom">
          <p>
            &copy; 2024 The Zubin Mathani Gidumal Foundation Limited (registered charity in Hong Kong - IR 91/12344).
            Website Developed By <a href="https://ksantechsoft.com" target="_blank" rel="noopener noreferrer">Code To Give Team 14</a>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainScrollPage
