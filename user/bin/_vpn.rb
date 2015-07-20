require 'fileutils'

def get_vpn_addr()
    return '188.226.137.200'
end

def get_ppp_addr()
    match = nil
    while(`ip a`.match(/ppp\d:/))
      match = `ip a`.match(/ppp\d:[\S\s]*peer\s*(\d+\.\d+\.\d+\.\d+)/)
      if match.nil?()
        STDOUT.write('.')
        sleep(0.25)
        next
      end

      break
    end

    STDOUT.write("\n")

    if match.nil?()
      raise "Failed to get ppp address"
    end

    return match[1]
end

def get_current_gateway_addr()
  match = `route -nee`.match(/0.0.0.0\s+(\d+\.\d+\.\d+\.\d+)/)
  if match.nil?()
    return
  end

  return match[1]
end

def save_default_gateway_addr()
  addr = get_current_gateway_addr()
  if addr == (get_ppp_addr() rescue nil) || addr.empty?()
    return
  end

  FileUtils.mkdir_p("#{Dir.home}/.tmp")
  File.write("#{Dir.home}/.tmp/vpn-default-gateway", addr)
end

def get_default_gateway_addr()
  if !File.exists?("#{Dir.home}/.tmp/vpn-default-gateway")
    return nil
  end

  return File.read("#{Dir.home}/.tmp/vpn-default-gateway")
end

def run(command)
    puts(command)
    return system(command)
end