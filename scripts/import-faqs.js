
const fs = require('fs')
const path = require('path')

const faqs = [
    {
        question: "How do you define your aesthetic?",
        answer: "We do not subscribe to trends, nor do we identify as \"minimalists.\" Minimalism often implies a lack of something; our work is about the density of intent. We employ a Controlled Aesthetic System—a rigorous process of spatial editing where every object, texture, and shadow is calculated to serve a psychological purpose. We do not decorate rooms; we construct atmospheres.",
        category: "The Studio"
    },
    {
        question: "Do you accept single-room commissions?",
        answer: "Rarely. A home is a singular organism; a room cannot be severed from the logic of the whole without compromising the result. We accept commissions where we can control the entire \"exhale\" of the space—typically full renovations or comprehensive architectural interiors. Exceptions are made only for spaces of significant architectural interest.",
        category: "The Studio"
    },
    {
        question: "Will you work with my existing furniture?",
        answer: "If the piece possesses integrity, yes. We respect heirlooms and objects that have survived the test of time. However, we will ruthlessly edit out the disposable. If an object does not serve the narrative of the new space—or if it is built from materials that lie (veneers, plastics)—we will recommend its removal.",
        category: "The Studio"
    },
    {
        question: "Do you work internationally?",
        answer: "Yes. While we are based in London, the principles of human flourishing are universal. We are currently accepting commissions in the UK, Europe, and North America. For international projects, we deploy a \"Satellite Team\" approach, partnering with trusted local architects of record while maintaining absolute creative control from our London atelier.",
        category: "The Studio"
    },
    {
        question: "How do you structure your fees?",
        answer: "We do not sell hours; we sell intellectual property and value. Our fees are structured as a fixed design fee based on the complexity of the scope, ensuring our incentives are aligned with the quality of the outcome, not the duration of the process. We prioritize the \"fabric\" of the build—investing your budget into permanent materials (stone, timber, flooring) rather than temporary decoration.",
        category: "The Studio"
    },
    {
        question: "Why is there a lead time of 8–12 weeks?",
        answer: "Because we do not stockpile. Stockpiling implies that we view our work as a commodity to be shifted. We view it as a commission. Every piece in the Atelier is Made to Order specifically for you. We harvest the timber, cut the stone, and weave the upholstery only after the order is placed. We reject the culture of \"fast furniture\" and the waste it creates.",
        category: "Ordering & Lead Times"
    },
    {
        question: "Can I customize the dimensions or fabric?",
        answer: "Yes. While our standard dimensions are proportioned for balance, we understand that architecture varies. We offer COM (Customer’s Own Material) services for all upholstery and can adjust timber and stone sizing upon request.",
        category: "Bespoke & Customization"
    },
    {
        question: "How will the materials age?",
        answer: "Gracefully, but visibly. We generally avoid synthetic sealants that choke the material. Unlacquered brass will darken; leather will soften; linen will relax. These are not signs of ruin; they are the accumulation of history. We design objects that are meant to be used, touched, and lived with.",
        category: "Care & Maintenance"
    },
    {
        question: "Do you offer \"White Glove\" delivery?",
        answer: "Exclusively. Our furniture is heavy—solid oak and travertine do not flat-pack. We do not leave boxes at your doorstep. Our logistics team will deliver the piece into the specific room, unwrap it, assemble it (if required), and remove all packaging. We ensure the object is placed exactly where the \"controlled aesthetic system\" demands it to be.",
        category: "Shipping & Delivery"
    },
    {
        question: "What is the meaning behind the name \"Anakhe\"?",
        answer: "The name is derived from the Hebrew root for \"Giant\" or \"Huge.\"\nWe believe that an interior must possess gravity to anchor the human spirit. Our work is a study in monumentality—using heavy materials, vast volumes, and uncompromising scale to build spaces that feel larger than life. We do not design for the smallness of modern living; we design for the enormity of the human experience.",
        category: "The Studio"
    },
    {
        question: "Does Jordan personally oversee every project?",
        answer: "Yes. The studio is intentionally kept small to preserve the integrity of the Controlled Aesthetic System. Jordan is not just a figurehead; she is the primary author of every project. Every material sample, every floor plan, and every joinery detail passes through her hands before it reaches our clients.",
        category: "The Studio"
    }
]

function generateNDJSON() {
    const ndjson = faqs.map(faq => {
        return JSON.stringify({
            _type: 'faq',
            question: faq.question,
            answer: {
                _type: 'blockContent',
                children: [
                    {
                        _type: 'block',
                        style: 'normal',
                        markDefs: [],
                        children: [
                            {
                                _type: 'span',
                                marks: [],
                                text: faq.answer
                            }
                        ]
                    }
                ]
            },
            category: faq.category
        })
    }).join('\n')

    fs.writeFileSync(path.join(__dirname, '..', 'faqs.ndjson'), ndjson)
    console.log('Generated faqs.ndjson')
}

generateNDJSON()
