export const getOrganizationInfo = (organization) => {
    switch (organization) {
        case "zubkoffbank":
            return {
                name: "Zubkoff Bank",
                color: "#1373E5"
            }
        case "vetroffbank":
            return {
                name: "Vetroff Bank",
                color: "#09ab55"
            }
        case "amirhanoffbank":
            return {
                name: "Amirhanoff Bank",
                color: "#ffb82b"
            }
        default:
            return {
                name: "Zubkoff Bank",
                color: "#1373E5"
            }
    }
}