const picData = () => {
    const pics = [
        {
            pic: require("../assets/pic0.jpg"),
            title: "Majestic Clouds",
            time: "2d",
            rating: [4.9, 36],
            comms: [
                {
                    name: "pixGenius",
                    pic: require("../assets/genius.jpg"),
                    comment: "This doesnt even look real! what an amazing shot!",
                    time: "11m",
                    replies: []
                },
                {
                    name: "wendy123",
                    pic: require("../assets/wendy.jpg"),
                    comment: "I'm so jealous that you got to see this irl 😍",
                    time: "6h",
                    replies: []
                },
                {
                    name: "n00b_pics",
                    pic: require("../assets/User.jpg"),
                    comment: "What camera settings did you use to get this effect?",
                    time: "1d",
                    replies: [
                        {
                            name: "PhotoNomad_",
                            pic: require("../assets/chloe.jpg"),
                            comment: "F-stop f/5.6, Exposure time 1/1600 sec, ISO 320, Focal Length 420mm",
                            time: "37m",}
                    ]
                }
            ]
        },
        {
            pic: require("../assets/pic1.jpg"),
            title: "Midnight Mass",
            time: "5d",
            rating: [4.7, 19],
            comms: [
                {
                    name: "_thatguy_",
                    pic: require("../assets/thatguy.jpg"),
                    comment: "Long exposure photography is my favourite!",
                    time: "11m",
                    replies: []
                }
            ]
        },
        {
            pic: require("../assets/pic3.jpg"),
            title: "Dawn Beach",
            time: "6d",
            rating: [4.3, 22],
            comms: []
        },
    ]

    return { pics }
}

export default picData;