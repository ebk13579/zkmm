import * as argparse from 'argparse'
import * as compile from 'circom'
import {existsSync, readFileSync, writeFileSync} from 'fs'

const main = async () => {
    const parser = new argparse.ArgumentParser({
        description: 'Compile the zk-SNARK circuit'
    })

    parser.addArgument(
        ['-i', '--input'],
        { help: 'the .circom source file' }
    )

    parser.addArgument(
        ['-o', '--output'],
        { help: 'the .json output file' }
    )

    parser.addArgument(
        ['-r', '--override'],
        { 
            help: 'override the output file (y/n)',
            defaultValue: 'n'
        }
    )


    const args = parser.parseArgs();
    const input = args.input
    const output = args.output
    const override = args.override.toLowerCase().startsWith('y')

    if (!existsSync(input)) {
        console.error(input, 'does not exist')
        return
    }

    if (!existsSync(output) || override) {
        const circuitDef = await compile(input)
        writeFileSync(
            output,
            JSON.stringify(circuitDef),
            'utf8'
        )
    }
}


main()
