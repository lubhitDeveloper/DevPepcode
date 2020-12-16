function getFirstName(name)
{
    name =name.split(" ");
    return name[0];
}

function getLastName(name)
{
    name =name.split(" ");
    return name[1];
}

function lm(name, sayHi)
{
    let a = sayHi(name);
    console.log(a + " says Hi");
}

lm("Lubhit Malhotra", getFirstName);
lm("Lubhit Malhotra", getLastName);