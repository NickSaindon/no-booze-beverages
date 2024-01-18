import Layout from '@/components/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';


const KratomFAQ = () => {
  return (
    <Layout>
        <div className="kratom-faq-container page-contain py-5">
          <div className="kratom-faq-header">
            <h1>Kratom FAQ</h1>
          </div>
            <Container className="pt-5">
                <Row>
        <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>What is Kratom?</Accordion.Header>
        <Accordion.Body>
          Mitragyna speciosa is a tropical evergreen tree in the coffee family native to Southeast Asia. It is indigenous to Thailand, Indonesia, Malaysia, Myanmar, and 
          Papua New Guinea, where it has been used in herbal medicine since at least the nineteenth century. Traditionally, kratom leaves were chewed or brewed into a tea, and it's 
          been used for a variety of purposes. Nowadays, kratom is consumed in various forms like powder, capsules, and even as an ingredient in beverages like our Kranium Soda and 
          Teas. As kratom gains popularity in the western world, it's essential to stay informed about its origins, FDA regulations, and potential benefits and risks.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>What makes Kratom unique?</Accordion.Header>
        <Accordion.Body>
        The primary chemicals responsible for kratom's effects are alkaloids called mitragynine and 7-hydroxymitragynine. These alkaloids interact with the body's opioid receptors, but 
        in a different way than traditional opioids like morphine. This interaction is what gives kratom its pain-relieving, mood-enhancing, and stimulating properties. Mitragynine is 
        the more abundant of the two alkaloids and is generally responsible for kratom's stimulating effects at lower doses. On the other hand, 7-hydroxymitragynine, while present in 
        smaller amounts, is more potent and contributes to the plant's analgesic and sedative effects at higher doses. It's important to note that kratom contains more than 40 
        alkaloids, and these compounds can vary in concentration depending on factors like the plant's age, location, and harvest time. This variation can lead to differences in the 
        effects experienced when consuming kratom.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Kratom Consumer Protection Act (KCPA) & what it means for you?</Accordion.Header>
        <Accordion.Body>
          The Kratom Consumer Protection Act (KCPA) is a series of state-level legislative bills aimed at regulating the kratom industry to ensure the safety and quality of kratom products 
          for consumers. The KCPA aims to establish guidelines for the production, sale, and distribution of kratom products, focusing on labeling requirements, age restrictions, and quality 
          control measures. 
          <br/><br/>
          The main objectives of the Kratom Consumer Protection Act are to:
          <ol>
            <li>Prevent the sale of adulterated or contaminated kratom products, which can pose significant health risks to consumers.</li>
            <li>Establish a minimum age requirement for purchasing kratom, typically 18 or 21 years, depending on the state.</li>
            <li>Require proper labeling of kratom products, including disclosure of ingredients, alkaloid content, and appropriate usage instructions or warnings.</li>
            <li>Implement quality control standards for kratom vendors to ensure that products are free from harmful substances, such as heavy metals, bacteria, or other contaminants.</li>
            <li>Penalize non-compliant vendors through fines or other legal actions, thereby encouraging responsible industry practices and consumer safety.</li>
          </ol>       
          By setting these standards, the KCPA aims to protect kratom consumers from potential health risks while allowing responsible vendors to continue providing safe and reliable 
          products. It is important to note that the KCPA's implementation and specific regulations may vary from state to state.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Effects of Kratom on mental health?</Accordion.Header>
        <Accordion.Body>
        <ol>
            <li>Kratom dependence: Although kratom use can lead to physiological dependence, the risk is generally lower than that of opioids. Further research is needed to determine dependence rates in various populations.</li>
            <li>Harm reduction potential: Kratom may offer a harm reduction alternative for people struggling with opioid addiction. As an opiate substitute, kratom poses a lower risk of fatal overdoses than opioids. However, more research is needed to confirm its effectiveness.</li>
            <li> Mood and anxiety effects: Low doses of kratom can increase energy and improve mood, while higher doses may help reduce anxiety. Kratom also seems to foster increased sociability. However, long-term effects on mood and anxiety remain uncertain, warranting further studies.</li>
            <li> Cultural and demographic factors: The review uncovered data discrepancies due to cultural and demographic factors. For instance, Western women are more likely to use kratom for emotional support, while men often use it as a substitute for opioids.</li>
            <li>Mental health risks: No significant mental health risks have been linked to kratom use, except for potential dependence. Minimal evidence points to kratom-induced psychosis or aggression.</li>
          </ol>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </Row>
    </Container>
        </div>
    </Layout>
  )
}

export default KratomFAQ;